import { useState } from 'react'

const TAB_STYLE = (active) => ({
  padding: '9px 18px', borderRadius: 8, cursor: 'pointer',
  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
  border: 'none', letterSpacing: 0.5, transition: 'all 0.2s', whiteSpace: 'nowrap',
  background: active ? 'linear-gradient(135deg, #8B4513, #C8720A)' : 'transparent',
  color: active ? '#FFE8A0' : 'var(--brown-mid)',
  boxShadow: active ? '0 4px 12px rgba(180,100,0,0.3)' : 'none',
})

export default function AdminPanel({ questions, addQuestion, updateQuestion, deleteQuestion, trips, addTrip, updateTrip, deleteTrip, feedbacks, deleteFeedback, onLogout }) {
  const [tab, setTab] = useState('overview')
  return (
    <div style={{ minHeight: '100vh', background: '#F5EDD8' }}>
      <div style={{ background: 'linear-gradient(135deg, #3A1200, #6B2E00)', padding: '0 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🪔</span>
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 700, color: '#FFD580', letterSpacing: 2 }}>VINAYAK TRAVELS</div>
              <div style={{ fontSize: 8, color: 'rgba(255,213,128,0.6)', letterSpacing: 2 }}>ADMIN PANEL</div>
            </div>
          </div>
          <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,213,128,0.3)', color: '#FFD580', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🚪 Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px, 4vw, 28px) clamp(12px, 4vw, 24px)' }}>
        <div className="admin-tabs" style={{ display: 'flex', gap: 4, background: '#fff', borderRadius: 12, padding: 5, border: '1.5px solid var(--border)', marginBottom: 22, width: 'fit-content', maxWidth: '100%', overflowX: 'auto' }}>
          {[{ id: 'overview', label: '📊 Overview' }, { id: 'trips', label: '✈️ Trips' }, { id: 'questions', label: '❓ Questions' }, { id: 'feedbacks', label: '💬 Feedbacks' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={TAB_STYLE(tab === t.id)}>{t.label}</button>
          ))}
        </div>
        {tab === 'overview' && <OverviewTab feedbacks={feedbacks} trips={trips} questions={questions} />}
        {tab === 'trips' && <TripsTab trips={trips} addTrip={addTrip} updateTrip={updateTrip} deleteTrip={deleteTrip} />}
        {tab === 'questions' && <QuestionsTab questions={questions} addQuestion={addQuestion} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />}
        {tab === 'feedbacks' && <FeedbacksTab feedbacks={feedbacks} questions={questions} deleteFeedback={deleteFeedback} />}
      </div>
    </div>
  )
}

function OverviewTab({ feedbacks, trips, questions }) {
  const avg = feedbacks.length ? (feedbacks.reduce((s, f) => s + (f.avgrating || 0), 0) / feedbacks.length).toFixed(1) : 'N/A'
  return (
    <div>
      <div className="stat-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[{ icon: '💬', label: 'Feedbacks', value: feedbacks.length }, { icon: '⭐', label: 'Avg Rating', value: avg }, { icon: '✈️', label: 'Trips', value: trips.length }, { icon: '❓', label: 'Questions', value: questions.length }].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '18px 16px', border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 26, fontWeight: 700, color: 'var(--brown-dark)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--brown-light)', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: '18px', border: '1.5px solid var(--border)' }}>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 14 }}>Recent Feedbacks</h3>
        {feedbacks.slice(0, 5).map((fb, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: 4 }}>
            <div>
              <span style={{ fontWeight: 600, color: 'var(--brown-dark)', fontSize: 13 }}>{fb.name}</span>
              <span style={{ fontSize: 11, color: 'var(--brown-light)', marginLeft: 8 }}>· {fb.tripname}</span>
            </div>
            <div style={{ color: '#FFB800', fontSize: 13 }}>{'★'.repeat(Math.round(fb.avgrating || 5))}<span style={{ color: 'var(--brown-light)', fontSize: 11, marginLeft: 6 }}>{fb.date}</span></div>
          </div>
        ))}
        {feedbacks.length === 0 && <p style={{ color: 'var(--brown-light)', fontStyle: 'italic', fontSize: 13 }}>No feedbacks yet.</p>}
      </div>
    </div>
  )
}

function TripsTab({ trips, addTrip, updateTrip, deleteTrip }) {
  const empty = { destination: '', date: '', price: '', seats: 10, includes: '', image: '🕌', category: '' }
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showCatForm, setShowCatForm] = useState(false)
  const [newCatName, setNewCatName] = useState('')

  const categories = ['All', ...Array.from(new Set(trips.map(t => t.category).filter(Boolean)))]
  const filteredTrips = activeCategory === 'All' ? trips : trips.filter(t => t.category === activeCategory)

  const handleSave = async () => {
    if (!form.destination || !form.date || !form.price) return
    setSaving(true)
    const includes = typeof form.includes === 'string' ? form.includes.split(',').map(s => s.trim()).filter(Boolean) : form.includes
    if (editId) { await updateTrip(editId, { ...form, includes }); setEditId(null) }
    else { await addTrip({ ...form, includes }) }
    setForm(empty); setShowForm(false); setSaving(false)
  }

  const handleEdit = (trip) => {
    setForm({ ...trip, includes: Array.isArray(trip.includes) ? trip.includes.join(', ') : trip.includes || '' })
    setEditId(trip.id); setShowForm(true)
  }

  const handleDelete = async (id) => { if (confirm('Delete this trip?')) await deleteTrip(id) }

  const handleAddCat = () => {
    if (!newCatName.trim()) return
    setActiveCategory(newCatName.trim()); setForm(p => ({ ...p, category: newCatName.trim() }))
    setNewCatName(''); setShowCatForm(false); setShowForm(true); setEditId(null)
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 8 }}>Categories</div>
        <div className="cat-tabs" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 11, fontWeight: 600, border: '1.5px solid',
              borderColor: activeCategory === cat ? 'var(--saffron)' : 'var(--border)',
              background: activeCategory === cat ? 'linear-gradient(135deg, #8B4513, #C8720A)' : '#fff',
              color: activeCategory === cat ? '#FFE8A0' : 'var(--brown-mid)',
            }}>{cat} {cat !== 'All' && `(${trips.filter(t => t.category === cat).length})`}</button>
          ))}
          {!showCatForm ? (
            <button onClick={() => setShowCatForm(true)} style={{ padding: '6px 12px', borderRadius: 20, cursor: 'pointer', fontSize: 11, fontWeight: 600, border: '1.5px dashed var(--saffron)', background: 'rgba(200,134,10,0.06)', color: 'var(--saffron)' }}>➕ New Category</button>
          ) : (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Category name..." onKeyDown={e => e.key === 'Enter' && handleAddCat()} autoFocus style={{ ...iS, width: 140, padding: '6px 10px', fontSize: '12px' }} />
              <button onClick={handleAddCat} style={{ ...sB, padding: '6px 12px', fontSize: 12 }}>✓</button>
              <button onClick={() => { setShowCatForm(false); setNewCatName('') }} style={{ ...cB, padding: '6px 10px', fontSize: 12 }}>✕</button>
            </div>
          )}
        </div>
      </div>

      {!showForm && (
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ ...empty, category: activeCategory === 'All' ? '' : activeCategory }) }} style={aB}>
          ➕ Add Trip {activeCategory !== 'All' ? `in "${activeCategory}"` : ''}
        </button>
      )}

      {showForm && (
        <div style={fB}>
          <h3 style={fT}>{editId ? '✏️ Edit Trip' : '➕ Add New Trip'}</h3>
          <div className="form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={lS}>Destination *</label>
              <input value={form.destination} onChange={e => setForm(p => ({ ...p, destination: e.target.value }))} placeholder="e.g. Trimbakeshwar Darshan" style={iS} />
            </div>
            <div><label style={lS}>Date *</label><input value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="e.g. 10 Jan 2025" style={iS} /></div>
            <div><label style={lS}>Price *</label><input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="e.g. ₹1,999" style={iS} /></div>
            <div><label style={lS}>Seats</label><input type="number" value={form.seats} onChange={e => setForm(p => ({ ...p, seats: parseInt(e.target.value) || 0 }))} style={iS} /></div>
            <div><label style={lS}>Emoji</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} style={iS} /></div>
            <div><label style={lS}>Category</label><input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Maharashtra" style={iS} /></div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={lS}>Includes (comma-separated)</label>
              <input value={form.includes} onChange={e => setForm(p => ({ ...p, includes: e.target.value }))} placeholder="AC Bus, Breakfast, VIP Darshan" style={iS} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={handleSave} disabled={saving} style={sB}>{saving ? '⏳ Saving...' : '💾 Save Trip'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} style={cB}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginTop: 16 }}>
        {filteredTrips.map(trip => (
          <div key={trip.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1.5px solid var(--border)' }}>
            <div style={{ background: 'linear-gradient(135deg, #8B4513, #C8720A)', padding: '14px 16px', position: 'relative' }}>
              <div style={{ position: 'absolute', right: 8, top: 4, fontSize: 44, opacity: 0.2 }}>{trip.image}</div>
              {trip.category && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,232,160,0.65)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>{trip.category}</span>}
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 700, color: '#FFE8A0' }}>{trip.destination}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,232,160,0.7)', marginTop: 2 }}>📅 {trip.date} · {trip.price}</div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {(trip.includes || []).map(inc => <span key={inc} style={{ background: 'var(--cream2)', fontSize: 10, padding: '2px 7px', borderRadius: 4, color: 'var(--brown-mid)', border: '1px solid var(--border)' }}>{inc}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(trip)} style={{ ...aBtn, background: 'rgba(200,134,10,0.1)', color: 'var(--saffron)', border: '1px solid var(--border)' }}>✏️ Edit</button>
                <button onClick={() => handleDelete(trip.id)} style={{ ...aBtn, background: 'rgba(192,57,43,0.08)', color: '#C0392B', border: '1px solid rgba(192,57,43,0.2)' }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredTrips.length === 0 && !showForm && <p style={{ textAlign: 'center', color: 'var(--brown-light)', fontStyle: 'italic', marginTop: 24 }}>No trips in this category.</p>}
    </div>
  )
}

function QuestionsTab({ questions, addQuestion, updateQuestion, deleteQuestion }) {
  const empty = { text: '', type: 'rating' }
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.text.trim()) return
    setSaving(true)
    if (editId) { await updateQuestion(editId, form); setEditId(null) }
    else { await addQuestion(form) }
    setForm(empty); setShowForm(false); setSaving(false)
  }

  const typeBadge = { rating: { bg: '#FFF3CD', color: '#856404', label: '⭐ Rating' }, yesno: { bg: '#D1ECF1', color: '#0C5460', label: '👍 Yes/No' }, text: { bg: '#D4EDDA', color: '#155724', label: '📝 Text' } }

  return (
    <div>
      {!showForm && <button onClick={() => { setShowForm(true); setEditId(null); setForm(empty) }} style={aB}>➕ Add Question</button>}
      {showForm && (
        <div style={fB}>
          <h3 style={fT}>{editId ? '✏️ Edit Question' : '➕ Add Question'}</h3>
          <div style={{ marginBottom: 12 }}>
            <label style={lS}>Question *</label>
            <input value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} placeholder="e.g. How was your overall experience?" style={iS} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={lS}>Answer Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['rating', 'yesno', 'text'].map(t => (
                <button key={t} type="button" onClick={() => setForm(p => ({ ...p, type: t }))} style={{
                  padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600, border: '1.5px solid',
                  borderColor: form.type === t ? 'var(--saffron)' : 'var(--border)',
                  background: form.type === t ? 'linear-gradient(135deg, #8B4513, #C8720A)' : '#fff',
                  color: form.type === t ? '#FFE8A0' : 'var(--brown-mid)',
                }}>{typeBadge[t]?.label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSave} disabled={saving} style={sB}>{saving ? '⏳...' : '💾 Save'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} style={cB}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {questions.map((q, idx) => {
          const badge = typeBadge[q.type] || typeBadge.text
          return (
            <div key={q.id} style={{ background: '#fff', borderRadius: 10, padding: '12px 16px', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, color: 'var(--saffron)', minWidth: 26 }}>{String(idx + 1).padStart(2, '0')}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--brown-dark)', marginBottom: 4 }}>{q.text}</p>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 5, background: badge.bg, color: badge.color }}>{badge.label}</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { setForm({ text: q.text, type: q.type }); setEditId(q.id); setShowForm(true) }} style={{ ...aBtn, background: 'rgba(200,134,10,0.1)', color: 'var(--saffron)', border: '1px solid var(--border)' }}>✏️</button>
                <button onClick={() => { if (confirm('Delete?')) deleteQuestion(q.id) }} style={{ ...aBtn, background: 'rgba(192,57,43,0.08)', color: '#C0392B', border: '1px solid rgba(192,57,43,0.2)' }}>🗑️</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FeedbacksTab({ feedbacks, questions, deleteFeedback }) {
  const [expanded, setExpanded] = useState(null)

  const getQ = (qId) => {
    const q = questions.find(q => String(q.id) === String(qId))
    return q ? q.text : `Question #${qId}`
  }

  const renderAns = (ans) => {
    if (typeof ans === 'number') return <span style={{ color: '#FFB800' }}>{'★'.repeat(ans)}<span style={{ color: 'var(--brown-light)', fontSize: 11, marginLeft: 4 }}>{ans}/5</span></span>
    if (ans === 'Yes') return <span style={{ color: '#2E7D32', fontWeight: 600 }}>👍 Yes</span>
    if (ans === 'No') return <span style={{ color: '#C62828', fontWeight: 600 }}>👎 No</span>
    return <span style={{ color: 'var(--brown-mid)' }}>{ans}</span>
  }

  const exportCSV = () => {
    if (!feedbacks.length) return
    const headers = ['Name', 'Trip', 'Avg Rating', 'Date', 'Phone', ...questions.map(q => q.text)]
    const rows = feedbacks.map(f => [f.name, f.tripname, f.avgrating, f.date, f.phone || '', ...questions.map(q => f.answers?.[q.id] ?? '')])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'vinayak_feedbacks.csv'; a.click()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 13, color: 'var(--brown-light)', fontWeight: 500 }}>Total: <strong style={{ color: 'var(--brown-dark)' }}>{feedbacks.length}</strong> feedbacks</div>
        <button onClick={exportCSV} style={{ ...aB, marginBottom: 0, opacity: feedbacks.length ? 1 : 0.5 }}>📥 Export CSV</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {feedbacks.map((fb, idx) => {
          const isOpen = expanded === (fb.id || idx)
          return (
            <div key={fb.id || idx} style={{ background: '#fff', borderRadius: 12, border: `1.5px solid ${isOpen ? 'var(--saffron)' : 'var(--border)'}`, overflow: 'hidden', transition: 'all 0.2s' }}>
              <div onClick={() => setExpanded(isOpen ? null : (fb.id || idx))} style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 700, color: 'var(--brown-dark)' }}>{fb.name}</span>
                  {fb.phone && <span style={{ fontSize: 11, color: 'var(--brown-light)', marginLeft: 8 }}>📱 {fb.phone}</span>}
                  <div style={{ fontSize: 11, color: 'var(--saffron)', marginTop: 2, fontWeight: 500 }}>✈️ {fb.tripname}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: '#FFB800', fontSize: 13 }}>{'★'.repeat(Math.round(fb.avgrating || 5))}</div>
                  <div style={{ fontSize: 10, color: 'var(--brown-light)' }}>{fb.date}</div>
                  <div style={{ fontSize: 10, color: 'var(--saffron)', fontWeight: 600, marginTop: 2 }}>{isOpen ? '▲ Close' : '▼ View'}</div>
                </div>
              </div>
              {isOpen && (
                <div style={{ padding: '0 16px 14px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {Object.entries(fb.answers || {}).map(([qId, ans], i) => (
                      <div key={i} style={{ background: 'var(--cream)', borderRadius: 7, padding: '9px 12px', borderLeft: '3px solid var(--saffron)' }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--saffron)', letterSpacing: 0.5, marginBottom: 4, textTransform: 'uppercase' }}>Q{i + 1}. {getQ(qId)}</div>
                        <div style={{ fontSize: 13 }}>{renderAns(ans)}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => deleteFeedback(fb.id)} style={{ ...aBtn, marginTop: 12, background: 'rgba(192,57,43,0.08)', color: '#C0392B', border: '1px solid rgba(192,57,43,0.2)', fontSize: 11 }}>🗑️ Delete Feedback</button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {feedbacks.length === 0 && <div style={{ textAlign: 'center', padding: '50px 20px', background: '#fff', borderRadius: 12, border: '1.5px dashed var(--border)' }}><div style={{ fontSize: 36, marginBottom: 10 }}>📭</div><p style={{ color: 'var(--brown-light)', fontStyle: 'italic' }}>No feedbacks yet.</p></div>}
    </div>
  )
}

const aB = { background: 'linear-gradient(135deg, #8B4513, #C8720A)', color: '#FFE8A0', border: 'none', borderRadius: 10, padding: '9px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.5, marginBottom: 14, boxShadow: '0 4px 14px rgba(180,100,0,0.25)', transition: 'transform 0.2s' }
const fB = { background: '#fff', borderRadius: 14, padding: 'clamp(16px, 4vw, 24px)', border: '1.5px solid var(--border)', boxShadow: '0 4px 20px rgba(150,80,10,0.08)', marginBottom: 16 }
const fT = { fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 16 }
const lS = { display: 'block', fontSize: 9, fontWeight: 600, letterSpacing: 2, color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 5 }
const iS = { width: '100%', padding: '10px 12px', background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: '13px', color: 'var(--brown-dark)', outline: 'none', fontFamily: 'Poppins, sans-serif' }
const sB = { background: 'linear-gradient(135deg, #8B4513, #C8720A)', color: '#FFE8A0', border: 'none', borderRadius: 8, padding: '9px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.5 }
const cB = { background: '#fff', color: 'var(--brown-mid)', border: '1.5px solid var(--border)', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }
const aBtn = { padding: '6px 12px', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s' }
