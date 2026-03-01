import { useState, useEffect } from 'react'
import { supabase } from './supabase.js'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import UpcomingTrips from './components/UpcomingTrips.jsx'
import FeedbackForm from './components/FeedbackForm.jsx'
import Footer from './components/Footer.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import AdminLogin from './components/AdminLogin.jsx'

export default function App() {
  const [page, setPage] = useState('home')
  const [questions, setQuestionsState] = useState([])
  const [trips, setTripsState] = useState([])
  const [feedbacks, setFeedbacksState] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => sessionStorage.getItem('vt_admin') === 'true')

  // Fetch all data from Supabase
  const fetchAll = async () => {
    setLoading(true)
    const [{ data: t }, { data: q }, { data: f }] = await Promise.all([
      supabase.from('trips').select('*').order('id'),
      supabase.from('questions').select('*').order('id'),
      supabase.from('feedbacks').select('*').order('created_at', { ascending: false }),
    ])
    if (t) setTripsState(t)
    if (q) setQuestionsState(q)
    if (f) setFeedbacksState(f)
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  // TRIPS CRUD
  const addTrip = async (trip) => {
    const { data } = await supabase.from('trips').insert([trip]).select()
    if (data) setTripsState(prev => [...prev, data[0]])
  }
  const updateTrip = async (id, trip) => {
    await supabase.from('trips').update(trip).eq('id', id)
    setTripsState(prev => prev.map(t => t.id === id ? { ...t, ...trip } : t))
  }
  const deleteTrip = async (id) => {
    await supabase.from('trips').delete().eq('id', id)
    setTripsState(prev => prev.filter(t => t.id !== id))
  }

  // QUESTIONS CRUD
  const addQuestion = async (q) => {
    const { data } = await supabase.from('questions').insert([q]).select()
    if (data) setQuestionsState(prev => [...prev, data[0]])
  }
  const updateQuestion = async (id, q) => {
    await supabase.from('questions').update(q).eq('id', id)
    setQuestionsState(prev => prev.map(x => x.id === id ? { ...x, ...q } : x))
  }
  const deleteQuestion = async (id) => {
    await supabase.from('questions').delete().eq('id', id)
    setQuestionsState(prev => prev.filter(x => x.id !== id))
  }

  // FEEDBACKS CRUD
  const addFeedback = async (fb) => {
    const { data } = await supabase.from('feedbacks').insert([fb]).select()
    if (data) setFeedbacksState(prev => [data[0], ...prev])
  }
  const deleteFeedback = async (id) => {
    await supabase.from('feedbacks').delete().eq('id', id)
    setFeedbacksState(prev => prev.filter(f => f.id !== id))
  }

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

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#FBF6EF', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ fontSize: 48, animation: 'float 1.5s ease-in-out infinite' }}>🪔</div>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, color: '#8B4513', letterSpacing: 2 }}>Loading...</div>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
    </div>
  )

  if (page === 'login') return <AdminLogin onLogin={handleAdminLogin} onBack={() => setPage('home')} />

  if (page === 'admin' && isAdminLoggedIn) return (
    <AdminPanel
      questions={questions} addQuestion={addQuestion} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion}
      trips={trips} addTrip={addTrip} updateTrip={updateTrip} deleteTrip={deleteTrip}
      feedbacks={feedbacks} deleteFeedback={deleteFeedback}
      onLogout={handleLogout}
    />
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Header onAdminClick={() => isAdminLoggedIn ? setPage('admin') : setPage('login')} />
      <HeroSection />
      <UpcomingTrips trips={trips} />
      <FeedbackForm questions={questions} addFeedback={addFeedback} trips={trips} />
      <Footer />
    </div>
  )
}
