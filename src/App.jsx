import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import UpcomingTrips from './components/UpcomingTrips.jsx'
import FeedbackForm from './components/FeedbackForm.jsx'
import Footer from './components/Footer.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import AdminLogin from './components/AdminLogin.jsx'

// Default data
const DEFAULT_QUESTIONS = [
  { id: 1, text: "How was your overall trip experience?", type: "rating" },
  { id: 2, text: "How would you rate the transportation comfort?", type: "rating" },
  { id: 3, text: "How was the food & meals provided?", type: "rating" },
  { id: 4, text: "Was the darshan experience satisfying?", type: "rating" },
  { id: 5, text: "Would you recommend Vinayak Travels to others?", type: "yesno" },
  { id: 6, text: "Share your memorable moment from the trip", type: "text" },
  { id: 7, text: "Any suggestions for improvement?", type: "text" },
]

const DEFAULT_TRIPS = [
  {
    id: 1,
    destination: "Shirdi & Shani Shingnapur",
    date: "15 Feb 2025",
    price: "₹1,499",
    seats: 12,
    includes: ["AC Bus", "Breakfast", "Darshan", "Guide"],
    image: "🕌"
  },
  {
    id: 2,
    destination: "Vaishno Devi Yatra",
    date: "1 Mar 2025",
    price: "₹4,999",
    seats: 8,
    includes: ["Flight", "Hotel", "Meals", "VIP Darshan"],
    image: "⛰️"
  },
  {
    id: 3,
    destination: "Tirupati Balaji",
    date: "20 Mar 2025",
    price: "₹5,499",
    seats: 6,
    includes: ["Train", "Hotel", "Meals", "Darshan Ticket"],
    image: "🏛️"
  }
]

export default function App() {
  const [page, setPage] = useState('home') // home | admin | login
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('vt_questions')
    return saved ? JSON.parse(saved) : DEFAULT_QUESTIONS
  })
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('vt_trips')
    return saved ? JSON.parse(saved) : DEFAULT_TRIPS
  })
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('vt_feedbacks')
    return saved ? JSON.parse(saved) : []
  })
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('vt_admin') === 'true'
  })

  // Persist data
  useEffect(() => { localStorage.setItem('vt_questions', JSON.stringify(questions)) }, [questions])
  useEffect(() => { localStorage.setItem('vt_trips', JSON.stringify(trips)) }, [trips])
  useEffect(() => { localStorage.setItem('vt_feedbacks', JSON.stringify(feedbacks)) }, [feedbacks])

  const handleAdminLogin = (password) => {
    if (password === 'vinayak_travels01@A') {
      setIsAdminLoggedIn(true)
      sessionStorage.setItem('vt_admin', 'true')
      setPage('admin')
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAdminLoggedIn(false)
    sessionStorage.removeItem('vt_admin')
    setPage('home')
  }

  if (page === 'login') {
    return <AdminLogin onLogin={handleAdminLogin} onBack={() => setPage('home')} />
  }

  if (page === 'admin' && isAdminLoggedIn) {
    return (
      <AdminPanel
        questions={questions}
        setQuestions={setQuestions}
        trips={trips}
        setTrips={setTrips}
        feedbacks={feedbacks}
        setFeedbacks={setFeedbacks}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Header onAdminClick={() => isAdminLoggedIn ? setPage('admin') : setPage('login')} />
      <HeroSection />
      <UpcomingTrips trips={trips} />
      <FeedbackForm questions={questions} feedbacks={feedbacks} setFeedbacks={setFeedbacks} trips={trips} />
      <Footer />
    </div>
  )
}
