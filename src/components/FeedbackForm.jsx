import { useState } from 'react'

const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1,2,3,4,5].map(star => (
        <button key={star} type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: 28, padding: '2px',
            color: star <= (hover || value) ? '#FFB800' : '#D4C4A0',
            transition: 'color 0.15s, transform 0.15s',
            transform: star <= (hover || value) ? 'scale(1.15)' : 'scale(1)',
          }}>★</button>
      ))}
    </div>
  )
}

export default function FeedbackForm({ questions, addFeedback, trips = [] }) {
  const [formData, setFormData] = useState({ name: '', tripName: '', tripId: '', phone: '' })
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleAnswer = (qId, value) => setAnswers(prev => ({ ...prev, [qId]: value }))

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.tripName) e.tripName = 'Please select a trip'
    questions.filter(q => q.type === 'rating').forEach(q => {
      if (!answers[q.id]) e[q.id] = 'Please rate this'
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const ratingQs = questions.filter(q => q.type === 'rating')
    const avgrating = ratingQs.length
      ? Math.round((ratingQs.reduce((s, q) => s + (answers[q.id] || 0), 0) / ratingQs.length) * 10) / 10
      : 5

    await addFeedback({
      name: formData.name,
      phone: formData.phone,
      tripname: formData.tripName,
      tripid: formData.tripId,
      answers,
      avgrating,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    })

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) return (
    <section id="feedback" style={{ padding: '80px 20px', background: 'var(--cream)' }}>
      <div style={{
        maxWidth: 560, margin: '0 auto', textAlign: 'center',
        background: '#fff', borderRadius: 20, padding: 'clamp(32px, 8vw, 60px) clamp(20px, 6vw, 40px)',
        border: '1.5px solid var(--border)', boxShadow: '0 8px 40px rgba(150,80,10,0.12)',
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🙏</div>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(20px, 6vw, 28px)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 10 }}>Dhanyavaad!</h3>
        <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 'clamp(14px, 4vw, 17px)', fontStyle: 'italic', color: 'var(--brown-light)', marginBottom: 24, lineHeight: 1.6 }}>
          Your blessings and feedback mean a lot to us. May your journeys always be filled with divine grace.
        </p>
        <button onClick={() => { setSubmitted(false); setFormData({ name: '', tripName: '', tripId: '', phone: '' }); setAnswers({}) }}
          style={{ background: 'linear-gradient(135deg, #8B4513, #C8720A)', color: '#FFE8A0', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Submit Another Feedback
        </button>
      </div>
    </section>
  )

  return (
    <section id="feedback" style={{ padding: 'clamp(48px, 10vw, 80px) 16px', background: 'linear-gradient(180deg, #FBF6EF 0%, #F5EDD8 100%)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 4, color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 8 }}>Your Experience Matters</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px, 6vw, 38px)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 12 }}>Share Your Blessings</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
            <div style={{ height: 1, width: 50, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
            <span style={{ color: 'var(--saffron)', fontSize: 16 }}>🌺</span>
            <div style={{ height: 1, width: 50, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(18px, 5vw, 36px)', border: '1.5px solid var(--border)', boxShadow: '0 8px 40px rgba(150,80,10,0.1)' }}>

            {/* Basic Info */}
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600, color: 'var(--brown-dark)', letterSpacing: 1.5, marginBottom: 16, textTransform: 'uppercase' }}>✦ Your Details</h4>

            <div className="feedback-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={lbl}>Your Name *</label>
                <input type="text" placeholder="Enter your name" value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  style={{ ...inp, borderColor: errors.name ? '#C0392B' : 'var(--border)' }} />
                {errors.name && <span style={err}>{errors.name}</span>}
              </div>
              <div>
                <label style={lbl}>Phone (optional)</label>
                <input type="tel" placeholder="Your number" value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} style={inp} />
              </div>
            </div>

            {/* Trip Selection */}
            <div style={{ marginBottom: 24 }}>
              <label style={lbl}>Select Your Trip *</label>
              {trips.length === 0 ? (
                <div style={{ padding: '14px', background: 'var(--cream)', border: '1.5px dashed var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--brown-light)', fontStyle: 'italic' }}>
                  No trips available right now. Please contact admin.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {trips.map(trip => {
                    const selected = formData.tripName === trip.destination
                    return (
                      <div key={trip.id}
                        onClick={() => setFormData(p => ({ ...p, tripName: trip.destination, tripId: trip.id }))}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
                          borderRadius: 10, cursor: 'pointer',
                          border: `1.5px solid ${selected ? 'var(--saffron)' : 'var(--border)'}`,
                          background: selected ? 'rgba(139,69,19,0.06)' : 'var(--cream)',
                          transition: 'all 0.2s',
                        }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                          border: `2px solid ${selected ? 'var(--saffron)' : '#ccc'}`,
                          background: selected ? 'var(--saffron)' : '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {selected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                        </div>
                        <span style={{ fontSize: 20 }}>{trip.image}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--brown-dark)', fontFamily: 'Cinzel, serif' }}>{trip.destination}</div>
                        </div>
                        {selected && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--saffron)' }}>✓</span>}
                      </div>
                    )
                  })}
                </div>
              )}
              {errors.tripName && <span style={err}>{errors.tripName}</span>}
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '0 0 24px' }} />

            {/* Questions */}
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600, color: 'var(--brown-dark)', letterSpacing: 1.5, marginBottom: 18, textTransform: 'uppercase' }}>✦ Your Experience</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
              {questions.map((q, idx) => (
                <div key={q.id} style={{ padding: '16px 16px', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 10, borderLeft: '3px solid var(--saffron)' }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--brown-dark)', marginBottom: 10, lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--saffron)', fontWeight: 700, marginRight: 6 }}>{String(idx + 1).padStart(2, '0')}.</span>{q.text}
                  </p>
                  {q.type === 'rating' && (
                    <div>
                      <StarRating value={answers[q.id] || 0} onChange={(val) => handleAnswer(q.id, val)} />
                      {errors[q.id] && <span style={err}>{errors[q.id]}</span>}
                    </div>
                  )}
                  {q.type === 'yesno' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Yes', 'No'].map(opt => (
                        <button key={opt} type="button" onClick={() => handleAnswer(q.id, opt)} style={{
                          padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                          border: '1.5px solid', borderColor: answers[q.id] === opt ? 'var(--saffron)' : 'var(--border)',
                          background: answers[q.id] === opt ? 'linear-gradient(135deg, #8B4513, #C8720A)' : '#fff',
                          color: answers[q.id] === opt ? '#FFE8A0' : 'var(--brown-mid)', transition: 'all 0.2s',
                        }}>{opt === 'Yes' ? '👍 Yes' : '👎 No'}</button>
                      ))}
                    </div>
                  )}
                  {q.type === 'text' && (
                    <textarea placeholder="Share your thoughts..." value={answers[q.id] || ''}
                      onChange={e => handleAnswer(q.id, e.target.value)} rows={3}
                      style={{ ...inp, resize: 'vertical', minHeight: 72, fontFamily: 'EB Garamond, serif', fontSize: '15px' }} />
                  )}
                </div>
              ))}
            </div>

            <button type="submit" disabled={submitting} style={{
              width: '100%', background: submitting ? '#ccc' : 'linear-gradient(135deg, #8B4513, #C8720A)',
              color: '#FFE8A0', border: 'none', borderRadius: 12, padding: '15px',
              fontSize: 15, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
              fontFamily: 'Cinzel, serif', letterSpacing: 1.5, textTransform: 'uppercase',
              boxShadow: '0 6px 20px rgba(180,100,0,0.3)',
            }}>
              {submitting ? '⏳ Submitting...' : '🙏 Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

const lbl = { display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 6 }
const inp = { width: '100%', padding: '10px 12px', background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: '14px', color: 'var(--brown-dark)', outline: 'none', fontFamily: 'Poppins, sans-serif' }
const err = { display: 'block', fontSize: 11, color: '#C0392B', marginTop: 4, fontWeight: 500 }
