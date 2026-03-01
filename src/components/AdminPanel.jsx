import { useState } from 'react'

const TAB_STYLE = (active) => ({
  padding: '10px 22px', borderRadius: 8, cursor: 'pointer',
  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
  border: 'none', letterSpacing: 0.5, transition: 'all 0.2s',
  background: active ? 'linear-gradient(135deg, #8B4513, #C8720A)' : 'transparent',
  color: active ? '#FFE8A0' : 'var(--brown-mid)',
  boxShadow: active ? '0 4px 16px rgba(180,100,0,0.3)' : 'none',
})

export default function AdminPanel({ questions, setQuestions, trips, setTrips, feedbacks, setFeedbacks, onLogout }) {
  const [tab, setTab] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', background: '#F5EDD8' }}>
      {/* Admin Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3A1200, #6B2E00)',
        padding: '0 28px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 26 }}>🪔</span>
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 700, color: '#FFD580', letterSpacing: 2 }}>
                VINAYAK TRAVELS
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,213,128,0.6)', letterSpacing: 2.5 }}>ADMIN PANEL</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,213,128,0.3)',
              color: '#FFD580', borderRadius: 8, padding: '7px 18px',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1,
            }}
          >🚪 Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 4vw, 24px)' }}>
        {/* Tabs */}
        <div className="admin-tabs" style={{
          display: 'flex', gap: 6, background: '#fff',
          borderRadius: 12, padding: 6,
          border: '1.5px solid var(--border)',
          marginBottom: 28, width: 'fit-content',
          maxWidth: '100%', overflowX: 'auto',
        }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'trips', label: '✈️ Trips' },
            { id: 'questions', label: '❓ Questions' },
            { id: 'feedbacks', label: '💬 Feedbacks' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={TAB_STYLE(tab === t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'overview' && <OverviewTab feedbacks={feedbacks} trips={trips} questions={questions} />}
        {tab === 'trips' && <TripsTab trips={trips} setTrips={setTrips} />}
        {tab === 'questions' && <QuestionsTab questions={questions} setQuestions={setQuestions} />}
        {tab === 'feedbacks' && <FeedbacksTab feedbacks={feedbacks} setFeedbacks={setFeedbacks} />}
      </div>
    </div>
  )
}

/* ---- OVERVIEW ---- */
function OverviewTab({ feedbacks, trips, questions }) {
  const avgRating = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + (f.avgRating || 0), 0) / feedbacks.length).toFixed(1)
    : 'N/A'

  const stats = [
    { icon: '💬', label: 'Total Feedbacks', value: feedbacks.length },
    { icon: '⭐', label: 'Avg Rating', value: avgRating },
    { icon: '✈️', label: 'Active Trips', value: trips.length },
    { icon: '❓', label: 'Questions', value: questions.length },
  ]

  return (
    <div>
      <div className="stat-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 22 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: '#fff', borderRadius: 14, padding: '22px 20px',
            border: '1.5px solid var(--border)',
            boxShadow: '0 4px 16px rgba(150,80,10,0.07)',
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 700, color: 'var(--brown-dark)' }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--brown-light)', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent feedbacks */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '22px', border: '1.5px solid var(--border)' }}>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 18 }}>
          Recent Feedbacks
        </h3>
        {feedbacks.slice(0, 5).map((fb, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: '1px solid var(--border)',
          }}>
            <div>
              <span style={{ fontWeight: 600, color: 'var(--brown-dark)', fontSize: 14 }}>{fb.name}</span>
              <span style={{ fontSize: 12, color: 'var(--brown-light)', marginLeft: 10 }}>· {fb.tripName}</span>
            </div>
            <div>
              <span style={{ color: '#FFB800', fontSize: 14 }}>{'★'.repeat(Math.round(fb.avgRating || 5))}</span>
              <span style={{ fontSize: 11, color: 'var(--brown-light)', marginLeft: 8 }}>{fb.date}</span>
            </div>
          </div>
        ))}
        {feedbacks.length === 0 && (
          <p style={{ color: 'var(--brown-light)', fontStyle: 'italic', fontSize: 14 }}>No feedbacks yet.</p>
        )}
      </div>
    </div>
  )
}

/* ---- TRIPS ---- */
function TripsTab({ trips, setTrips }) {
  const empty = { destination: '', date: '', price: '', seats: 10, includes: '', image: '🕌', description: '', category: '' }
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showCatForm, setShowCatForm] = useState(false)
  const [newCatName, setNewCatName] = useState('')

  // Get all unique categories from trips
  const categories = ['All', ...Array.from(new Set(trips.map(t => t.category).filter(Boolean)))]

  const handleSave = () => {
    if (!form.destination || !form.date || !form.price) return
    const includes = form.includes.split(',').map(s => s.trim()).filter(Boolean)
    if (editId) {
      setTrips(prev => prev.map(t => t.id === editId ? { ...form, includes, id: editId } : t))
      setEditId(null)
    } else {
      setTrips(prev => [...prev, { ...form, includes, id: Date.now() }])
    }
    setForm(empty)
    setShowForm(false)
  }

  const handleEdit = (trip) => {
    setForm({ ...trip, includes: trip.includes?.join(', ') || '' })
    setEditId(trip.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this trip?')) setTrips(prev => prev.filter(t => t.id !== id))
  }

  const handleAddCategory = () => {
    if (!newCatName.trim()) return
    // Just set the new category as active - it becomes real when a trip is added to it
    setActiveCategory(newCatName.trim())
    setForm(p => ({ ...p, category: newCatName.trim() }))
    setNewCatName('')
    setShowCatForm(false)
    setShowForm(true)
    setEditId(null)
  }

  const filteredTrips = activeCategory === 'All' ? trips : trips.filter(t => t.category === activeCategory)

  return (
    <div>
      {/* Category Tabs */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 10 }}>
          Trip Categories
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '7px 18px', borderRadius: 20, cursor: 'pointer',
              fontSize: 12, fontWeight: 600, border: '1.5px solid',
              borderColor: activeCategory === cat ? 'var(--saffron)' : 'var(--border)',
              background: activeCategory === cat ? 'linear-gradient(135deg, #8B4513, #C8720A)' : '#fff',
              color: activeCategory === cat ? '#FFE8A0' : 'var(--brown-mid)',
              transition: 'all 0.2s',
            }}>
              {cat} {cat !== 'All' && <span style={{ opacity: 0.7 }}>({trips.filter(t => t.category === cat).length})</span>}
            </button>
          ))}
          {/* Add new category button */}
          {!showCatForm ? (
            <button onClick={() => setShowCatForm(true)} style={{
              padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
              border: '1.5px dashed var(--saffron)',
              background: 'rgba(200,134,10,0.06)', color: 'var(--saffron)',
            }}>
              ➕ New Category
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                placeholder="Category name..."
                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                autoFocus
                style={{ ...inputS, width: 160, padding: '6px 12px', fontSize: 12 }}
              />
              <button onClick={handleAddCategory} style={{ ...saveBtnStyle, padding: '7px 14px', fontSize: 12 }}>✓ Add</button>
              <button onClick={() => { setShowCatForm(false); setNewCatName('') }} style={{ ...cancelBtnStyle, padding: '7px 12px', fontSize: 12 }}>✕</button>
            </div>
          )}
        </div>
      </div>

      {/* Add Trip Button */}
      {!showForm && (
        <button onClick={() => {
          setShowForm(true); setEditId(null)
          setForm({ ...empty, category: activeCategory === 'All' ? '' : activeCategory })
        }} style={addBtnStyle}>
          ➕ Add New Trip {activeCategory !== 'All' ? `in "${activeCategory}"` : ''}
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div style={formBoxStyle}>
          <h3 style={formTitleStyle}>{editId ? '✏️ Edit Trip' : '➕ Add New Trip'}</h3>
          <div className="admin-form-grid form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={lblStyle}>Destination *</label>
              <input value={form.destination} onChange={e => setForm(p => ({ ...p, destination: e.target.value }))} placeholder="e.g. Shirdi & Shani Shingnapur" style={inputS} />
            </div>
            <div>
              <label style={lblStyle}>Date *</label>
              <input value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="e.g. 15 Feb 2025" style={inputS} />
            </div>
            <div>
              <label style={lblStyle}>Price *</label>
              <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="e.g. ₹1,499" style={inputS} />
            </div>
            <div>
              <label style={lblStyle}>Seats Available</label>
              <input type="number" value={form.seats} onChange={e => setForm(p => ({ ...p, seats: parseInt(e.target.value) || 0 }))} style={inputS} />
            </div>
            <div>
              <label style={lblStyle}>Emoji Icon</label>
              <input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="🕌" style={inputS} />
            </div>
            <div>
              <label style={lblStyle}>Category</label>
              <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Maharashtra, Jyotirlinga..." style={inputS} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={lblStyle}>Includes (comma-separated)</label>
              <input value={form.includes} onChange={e => setForm(p => ({ ...p, includes: e.target.value }))} placeholder="AC Bus, Breakfast, VIP Darshan, Guide" style={inputS} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={handleSave} style={saveBtnStyle}>💾 Save Trip</button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} style={cancelBtnStyle}>Cancel</button>
          </div>
        </div>
      )}

      {/* Trip Cards */}
      <div className="trips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 20 }}>
        {filteredTrips.map(trip => (
          <div key={trip.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1.5px solid var(--border)' }}>
            <div style={{ background: 'linear-gradient(135deg, #8B4513, #C8720A)', padding: '16px 18px', position: 'relative' }}>
              <div style={{ position: 'absolute', right: 10, top: 5, fontSize: 50, opacity: 0.2 }}>{trip.image}</div>
              {trip.category && (
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,232,160,0.7)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                  {trip.category}
                </span>
              )}
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, color: '#FFE8A0' }}>{trip.destination}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,232,160,0.7)', marginTop: 3 }}>📅 {trip.date} · {trip.price}</div>
            </div>
            <div style={{ padding: '14px 18px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {(trip.includes || []).map(inc => (
                  <span key={inc} style={{ background: 'var(--cream2)', fontSize: 11, padding: '2px 8px', borderRadius: 5, color: 'var(--brown-mid)', border: '1px solid var(--border)' }}>
                    {inc}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(trip)} style={{ ...actionBtn, background: 'rgba(200,134,10,0.1)', color: 'var(--saffron)', border: '1px solid var(--border)' }}>✏️ Edit</button>
                <button onClick={() => handleDelete(trip.id)} style={{ ...actionBtn, background: 'rgba(192,57,43,0.08)', color: '#C0392B', border: '1px solid rgba(192,57,43,0.2)' }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTrips.length === 0 && !showForm && (
        <p style={{ textAlign: 'center', color: 'var(--brown-light)', fontStyle: 'italic', marginTop: 30 }}>
          No trips in this category. Click "Add New Trip" to add one!
        </p>
      )}
    </div>
  )
}

/* ---- QUESTIONS ---- */
function QuestionsTab({ questions, setQuestions }) {
  const empty = { text: '', type: 'rating' }
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleSave = () => {
    if (!form.text.trim()) return
    if (editId) {
      setQuestions(prev => prev.map(q => q.id === editId ? { ...form, id: editId } : q))
      setEditId(null)
    } else {
      setQuestions(prev => [...prev, { ...form, id: Date.now() }])
    }
    setForm(empty)
    setShowForm(false)
  }

  const handleEdit = (q) => {
    setForm({ text: q.text, type: q.type })
    setEditId(q.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this question?')) setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const typeBadge = { rating: { bg: '#FFF3CD', color: '#856404', label: '⭐ Rating' }, yesno: { bg: '#D1ECF1', color: '#0C5460', label: '👍 Yes/No' }, text: { bg: '#D4EDDA', color: '#155724', label: '📝 Text' } }

  return (
    <div>
      {!showForm && (
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(empty) }} style={addBtnStyle}>
          ➕ Add Question
        </button>
      )}

      {showForm && (
        <div style={formBoxStyle}>
          <h3 style={formTitleStyle}>{editId ? '✏️ Edit Question' : '➕ Add Question'}</h3>
          <div style={{ marginBottom: 14 }}>
            <label style={lblStyle}>Question *</label>
            <input value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} placeholder="e.g. How was your overall experience?" style={inputS} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={lblStyle}>Answer Type</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['rating', 'yesno', 'text'].map(t => (
                <button key={t} type="button" onClick={() => setForm(p => ({ ...p, type: t }))} style={{
                  padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  border: '1.5px solid', borderColor: form.type === t ? 'var(--saffron)' : 'var(--border)',
                  background: form.type === t ? 'linear-gradient(135deg, #8B4513, #C8720A)' : '#fff',
                  color: form.type === t ? '#FFE8A0' : 'var(--brown-mid)',
                  transition: 'all 0.2s',
                }}>
                  {typeBadge[t]?.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSave} style={saveBtnStyle}>💾 Save</button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} style={cancelBtnStyle}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {questions.map((q, idx) => {
          const badge = typeBadge[q.type] || typeBadge.text
          return (
            <div key={q.id} style={{
              background: '#fff', borderRadius: 10, padding: '14px 18px',
              border: '1.5px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <span style={{
                fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700,
                color: 'var(--saffron)', minWidth: 28,
              }}>{String(idx + 1).padStart(2, '0')}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--brown-dark)', marginBottom: 4 }}>{q.text}</p>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 5, background: badge.bg, color: badge.color }}>
                  {badge.label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => handleEdit(q)} style={{ ...actionBtn, background: 'rgba(200,134,10,0.1)', color: 'var(--saffron)', border: '1px solid var(--border)' }}>✏️</button>
                <button onClick={() => handleDelete(q.id)} style={{ ...actionBtn, background: 'rgba(192,57,43,0.08)', color: '#C0392B', border: '1px solid rgba(192,57,43,0.2)' }}>🗑️</button>
              </div>
            </div>
          )
        })}
      </div>

      {questions.length === 0 && !showForm && (
        <p style={{ textAlign: 'center', color: 'var(--brown-light)', fontStyle: 'italic', marginTop: 30 }}>No questions yet. Add your first question!</p>
      )}
    </div>
  )
}

/* ---- FEEDBACKS ---- */
function FeedbacksTab({ feedbacks, setFeedbacks }) {
  const [expanded, setExpanded] = useState(null)

  // Get questions from localStorage to show with answers
  const savedQuestions = (() => {
    try { return JSON.parse(localStorage.getItem('vt_questions') || '[]') } catch { return [] }
  })()

  const getQuestionText = (qId) => {
    const q = savedQuestions.find(q => String(q.id) === String(qId))
    return q ? q.text : `Question #${qId}`
  }

  const renderAnswer = (ans) => {
    if (typeof ans === 'number') return <span style={{ color: '#FFB800', fontSize: 16 }}>{'★'.repeat(ans)}<span style={{ color: 'var(--brown-light)', fontSize: 12, marginLeft: 4 }}>{ans}/5</span></span>
    if (ans === 'Yes') return <span style={{ color: '#2E7D32', fontWeight: 600 }}>👍 Yes</span>
    if (ans === 'No') return <span style={{ color: '#C62828', fontWeight: 600 }}>👎 No</span>
    return <span style={{ color: 'var(--brown-mid)' }}>{ans}</span>
  }

  const handleDelete = (id) => {
    if (confirm('Delete this feedback?')) setFeedbacks(prev => prev.filter(f => f.id !== id))
  }

  const exportCSV = () => {
    if (!feedbacks.length) return
    const headers = ['Name', 'Trip', 'Avg Rating', 'Date', 'Phone', ...savedQuestions.map(q => q.text)]
    const rows = feedbacks.map(f => [
      f.name, f.tripName, f.avgRating, f.date, f.phone || '',
      ...savedQuestions.map(q => f.answers?.[q.id] ?? '')
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = 'vinayak_feedbacks.csv'; a.click()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 14, color: 'var(--brown-light)', fontWeight: 500 }}>
          Total: <strong style={{ color: 'var(--brown-dark)' }}>{feedbacks.length}</strong> feedbacks
        </div>
        <button onClick={exportCSV} style={{ ...addBtnStyle, marginBottom: 0, opacity: feedbacks.length ? 1 : 0.5 }}>
          📥 Export CSV
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {feedbacks.map((fb, idx) => {
          const isOpen = expanded === (fb.id || idx)
          return (
            <div key={fb.id || idx} style={{
              background: '#fff', borderRadius: 12,
              border: `1.5px solid ${isOpen ? 'var(--saffron)' : 'var(--border)'}`,
              overflow: 'hidden',
              boxShadow: isOpen ? '0 4px 20px rgba(180,100,0,0.12)' : 'none',
              transition: 'all 0.2s',
            }}>
              {/* Header row - always visible */}
              <div
                onClick={() => setExpanded(isOpen ? null : (fb.id || idx))}
                style={{
                  padding: '16px 20px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: isOpen ? 'rgba(200,134,10,0.05)' : '#fff',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 700, color: 'var(--brown-dark)' }}>{fb.name}</span>
                  {fb.phone && <span style={{ fontSize: 12, color: 'var(--brown-light)', marginLeft: 10 }}>📱 {fb.phone}</span>}
                  <div style={{ fontSize: 12, color: 'var(--saffron)', marginTop: 2, fontWeight: 500 }}>✈️ {fb.tripName}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <div style={{ color: '#FFB800', fontSize: 15 }}>{'★'.repeat(Math.round(fb.avgRating || 5))}<span style={{ color: 'var(--brown-light)', fontSize: 11, marginLeft: 4 }}>{fb.avgRating}/5</span></div>
                  <div style={{ fontSize: 11, color: 'var(--brown-light)' }}>{fb.date}</div>
                  <div style={{ fontSize: 11, color: 'var(--saffron)', fontWeight: 600 }}>{isOpen ? '▲ Collapse' : '▼ View Answers'}</div>
                </div>
              </div>

              {/* Expanded answers - question + answer */}
              {isOpen && (
                <div style={{ padding: '0 20px 18px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {Object.entries(fb.answers || {}).map(([qId, ans], i) => (
                      <div key={i} style={{
                        background: 'var(--cream)', borderRadius: 8,
                        padding: '10px 14px',
                        borderLeft: '3px solid var(--saffron)',
                      }}>
                        <div style={{
                          fontSize: 11, fontWeight: 600, color: 'var(--saffron)',
                          letterSpacing: 0.5, marginBottom: 4, textTransform: 'uppercase',
                        }}>
                          Q{i + 1}. {getQuestionText(qId)}
                        </div>
                        <div style={{ fontSize: 14 }}>
                          {renderAnswer(ans)}
                        </div>
                      </div>
                    ))}
                    {Object.keys(fb.answers || {}).length === 0 && (
                      <p style={{ color: 'var(--brown-light)', fontStyle: 'italic', fontSize: 13 }}>No answers recorded.</p>
                    )}
                  </div>
                  <button onClick={() => handleDelete(fb.id)} style={{
                    ...actionBtn, marginTop: 14,
                    background: 'rgba(192,57,43,0.08)', color: '#C0392B',
                    border: '1px solid rgba(192,57,43,0.2)', fontSize: 11
                  }}>
                    🗑️ Delete Feedback
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {feedbacks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 14, border: '1.5px dashed var(--border)' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <p style={{ color: 'var(--brown-light)', fontStyle: 'italic' }}>No feedbacks received yet.</p>
        </div>
      )}
    </div>
  )
}

// Shared styles
const addBtnStyle = {
  background: 'linear-gradient(135deg, #8B4513, #C8720A)',
  color: '#FFE8A0', border: 'none', borderRadius: 10,
  padding: '10px 22px', fontSize: 13, fontWeight: 600,
  cursor: 'pointer', letterSpacing: 1, marginBottom: 16,
  boxShadow: '0 4px 16px rgba(180,100,0,0.25)',
  transition: 'transform 0.2s',
}

const formBoxStyle = {
  background: '#fff', borderRadius: 14, padding: '24px 26px',
  border: '1.5px solid var(--border)',
  boxShadow: '0 6px 24px rgba(150,80,10,0.1)',
  marginBottom: 20,
}

const formTitleStyle = {
  fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700,
  color: 'var(--brown-dark)', marginBottom: 18,
}

const lblStyle = {
  display: 'block', fontSize: 10, fontWeight: 600,
  letterSpacing: 2, color: 'var(--saffron)',
  textTransform: 'uppercase', marginBottom: 6,
}

const inputS = {
  width: '100%', padding: '10px 14px',
  background: 'var(--cream)', border: '1.5px solid var(--border)',
  borderRadius: 8, fontSize: 13, color: 'var(--brown-dark)',
  outline: 'none', fontFamily: 'Poppins, sans-serif',
}

const saveBtnStyle = {
  background: 'linear-gradient(135deg, #8B4513, #C8720A)',
  color: '#FFE8A0', border: 'none', borderRadius: 8,
  padding: '10px 24px', fontSize: 13, fontWeight: 600,
  cursor: 'pointer', letterSpacing: 1,
}

const cancelBtnStyle = {
  background: '#fff', color: 'var(--brown-mid)',
  border: '1.5px solid var(--border)', borderRadius: 8,
  padding: '10px 20px', fontSize: 13, fontWeight: 500,
  cursor: 'pointer',
}

const actionBtn = {
  padding: '6px 14px', borderRadius: 7, cursor: 'pointer',
  fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
}
