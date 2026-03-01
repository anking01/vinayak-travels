import { useState } from 'react'

const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 28, padding: '2px',
            color: star <= (hover || value) ? '#FFB800' : '#D4C4A0',
            transition: 'color 0.15s, transform 0.15s',
            transform: star <= (hover || value) ? 'scale(1.15)' : 'scale(1)',
          }}
        >★</button>
      ))}
    </div>
  )
}

export default function FeedbackForm({ questions, feedbacks, setFeedbacks, trips = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    tripName: '',
    phone: '',
  })
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleAnswer = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.tripName.trim()) e.tripName = 'Trip name is required'
    questions.filter(q => q.type === 'rating').forEach(q => {
      if (!answers[q.id]) e[q.id] = 'Please rate this'
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const newFeedback = {
      id: Date.now(),
      ...formData,
      answers,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      avgRating: (() => {
        const ratingQs = questions.filter(q => q.type === 'rating')
        if (!ratingQs.length) return 5
        const sum = ratingQs.reduce((acc, q) => acc + (answers[q.id] || 0), 0)
        return Math.round((sum / ratingQs.length) * 10) / 10
      })()
    }

    setFeedbacks(prev => [newFeedback, ...prev])
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="feedback" style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{
          maxWidth: 600, margin: '0 auto', textAlign: 'center',
          background: '#fff', borderRadius: 20, padding: '60px 40px',
          border: '1.5px solid var(--border)',
          boxShadow: '0 8px 40px rgba(150,80,10,0.12)',
        }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🙏</div>
          <h3 style={{
            fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 700,
            color: 'var(--brown-dark)', marginBottom: 12,
          }}>Dhanyavaad!</h3>
          <p style={{
            fontFamily: 'EB Garamond, serif', fontSize: 18, fontStyle: 'italic',
            color: 'var(--brown-light)', marginBottom: 28, lineHeight: 1.6,
          }}>
            Your blessings and feedback mean a lot to us. May your journeys always be filled with divine grace.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', tripName: '', phone: '' }); setAnswers({}) }}
            style={{
              background: 'linear-gradient(135deg, #8B4513, #C8720A)',
              color: '#FFE8A0', border: 'none', borderRadius: 10,
              padding: '12px 30px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', letterSpacing: 1,
            }}
          >
            Submit Another Feedback
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="feedback" style={{
      padding: '80px 24px',
      background: 'linear-gradient(180deg, #FBF6EF 0%, #F5EDD8 100%)',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: 4,
            color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 10,
          }}>Your Experience Matters</div>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 12,
          }}>Share Your Blessings</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
            <span style={{ color: 'var(--saffron)', fontSize: 18 }}>🌺</span>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: 'clamp(18px, 5vw, 36px)',
            border: '1.5px solid var(--border)',
            boxShadow: '0 8px 40px rgba(150,80,10,0.1)',
          }}>

            {/* Basic Info */}
            <div style={{ marginBottom: 32 }}>
              <h4 style={{
                fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 600,
                color: 'var(--brown-dark)', letterSpacing: 1.5, marginBottom: 18,
                textTransform: 'uppercase',
              }}>✦ Your Details</h4>

              <div className="feedback-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input
                    type="text" placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    style={{ ...inputStyle, borderColor: errors.name ? '#C0392B' : 'var(--border)' }}
                  />
                  {errors.name && <span style={errorStyle}>{errors.name}</span>}
                </div>
                <div>
                  <label style={labelStyle}>Phone (optional)</label>
                  <input
                    type="tel" placeholder="Your number"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Select Your Trip *</label>
                {trips.length === 0 ? (
                  <div style={{
                    padding: '14px', background: 'var(--cream)',
                    border: '1.5px dashed var(--border)', borderRadius: 8,
                    fontSize: 13, color: 'var(--brown-light)', fontStyle: 'italic',
                  }}>
                    No trips available right now. Please contact admin.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {trips.map(trip => {
                      const selected = formData.tripName === trip.destination
                      return (
                        <div
                          key={trip.id}
                          onClick={() => setFormData(p => ({ ...p, tripName: trip.destination, tripId: trip.id }))}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                            border: `1.5px solid ${selected ? 'var(--saffron)' : 'var(--border)'}`,
                            background: selected ? 'linear-gradient(135deg, rgba(139,69,19,0.08), rgba(200,114,10,0.08))' : 'var(--cream)',
                            transition: 'all 0.2s',
                            boxShadow: selected ? '0 2px 12px rgba(180,100,0,0.15)' : 'none',
                          }}
                        >
                          {/* Radio dot */}
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                            border: `2px solid ${selected ? 'var(--saffron)' : '#ccc'}`,
                            background: selected ? 'var(--saffron)' : '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}>
                            {selected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                          </div>

                          {/* Emoji */}
                          <span style={{ fontSize: 22 }}>{trip.image}</span>

                          {/* Trip info - only destination name */}
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: 14, fontWeight: 600, color: 'var(--brown-dark)',
                              fontFamily: 'Cinzel, serif',
                            }}>{trip.destination}</div>
                          </div>

                          {selected && (
                            <span style={{
                              fontSize: 11, fontWeight: 700, color: 'var(--saffron)',
                              letterSpacing: 1, textTransform: 'uppercase',
                            }}>✓ Selected</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
                {errors.tripName && <span style={errorStyle}>{errors.tripName}</span>}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '0 0 28px' }} />

            {/* Questions */}
            <div style={{ marginBottom: 28 }}>
              <h4 style={{
                fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 600,
                color: 'var(--brown-dark)', letterSpacing: 1.5, marginBottom: 22,
                textTransform: 'uppercase',
              }}>✦ Your Experience</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {questions.map((q, idx) => (
                  <div key={q.id} style={{
                    padding: '18px 20px',
                    background: 'var(--cream)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    borderLeft: '3px solid var(--saffron)',
                  }}>
                    <p style={{
                      fontSize: 14, fontWeight: 500, color: 'var(--brown-dark)',
                      marginBottom: 12, lineHeight: 1.5,
                    }}>
                      <span style={{ color: 'var(--saffron)', fontWeight: 700, marginRight: 6 }}>
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      {q.text}
                    </p>

                    {q.type === 'rating' && (
                      <div>
                        <StarRating
                          value={answers[q.id] || 0}
                          onChange={(val) => handleAnswer(q.id, val)}
                        />
                        {errors[q.id] && <span style={errorStyle}>{errors[q.id]}</span>}
                      </div>
                    )}

                    {q.type === 'yesno' && (
                      <div style={{ display: 'flex', gap: 10 }}>
                        {['Yes', 'No'].map(opt => (
                          <button
                            key={opt} type="button"
                            onClick={() => handleAnswer(q.id, opt)}
                            style={{
                              padding: '8px 24px', borderRadius: 8, cursor: 'pointer',
                              fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                              border: '1.5px solid',
                              borderColor: answers[q.id] === opt ? 'var(--saffron)' : 'var(--border)',
                              background: answers[q.id] === opt
                                ? 'linear-gradient(135deg, #8B4513, #C8720A)'
                                : '#fff',
                              color: answers[q.id] === opt ? '#FFE8A0' : 'var(--brown-mid)',
                              transition: 'all 0.2s',
                            }}
                          >{opt === 'Yes' ? '👍 Yes' : '👎 No'}</button>
                        ))}
                      </div>
                    )}

                    {q.type === 'text' && (
                      <textarea
                        placeholder="Share your thoughts..."
                        value={answers[q.id] || ''}
                        onChange={e => handleAnswer(q.id, e.target.value)}
                        rows={3}
                        style={{
                          ...inputStyle,
                          resize: 'vertical', minHeight: 80,
                          fontFamily: 'EB Garamond, serif', fontSize: 15,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button type="submit" style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8B4513, #C8720A)',
              color: '#FFE8A0', border: 'none', borderRadius: 12,
              padding: '16px', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Cinzel, serif',
              letterSpacing: 2, textTransform: 'uppercase',
              boxShadow: '0 6px 24px rgba(180,100,0,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 32px rgba(180,100,0,0.45)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 6px 24px rgba(180,100,0,0.35)'; }}
            >
              🙏 Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

const labelStyle = {
  display: 'block', fontSize: 11, fontWeight: 600,
  letterSpacing: 1.5, color: 'var(--saffron)',
  textTransform: 'uppercase', marginBottom: 7,
}

const inputStyle = {
  width: '100%', padding: '11px 14px',
  background: 'var(--cream)', border: '1.5px solid var(--border)',
  borderRadius: 8, fontSize: 14, color: 'var(--brown-dark)',
  outline: 'none', fontFamily: 'Poppins, sans-serif',
  transition: 'border-color 0.2s',
}

const errorStyle = {
  display: 'block', fontSize: 11, color: '#C0392B',
  marginTop: 4, fontWeight: 500,
}
