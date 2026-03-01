import { useState } from 'react'

export default function UpcomingTrips({ trips }) {
  const [hovered, setHovered] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(trips.map(t => t.category).filter(Boolean)))]
  const filteredTrips = activeCategory === 'All' ? trips : trips.filter(t => t.category === activeCategory)

  return (
    <section id="trips" style={{ padding: 'clamp(48px, 10vw, 80px) 16px', background: 'linear-gradient(180deg, #F5EDD8 0%, #FBF6EF 100%)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 4, color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 8 }}>Plan Your Next Yatra</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px, 6vw, 40px)', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 12 }}>Upcoming Sacred Trips</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ height: 1, width: 50, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
            <span style={{ color: 'var(--saffron)', fontSize: 16 }}>🌸</span>
            <div style={{ height: 1, width: 50, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
          </div>
          {categories.length > 1 && (
            <div className="cat-tabs" style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 4 }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: '6px 16px', borderRadius: 20, cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, border: '1.5px solid',
                  borderColor: activeCategory === cat ? 'var(--saffron)' : 'var(--border)',
                  background: activeCategory === cat ? 'linear-gradient(135deg, #8B4513, #C8720A)' : '#fff',
                  color: activeCategory === cat ? '#FFE8A0' : 'var(--brown-mid)',
                  transition: 'all 0.2s', fontFamily: 'Poppins, sans-serif',
                }}>{cat}</button>
              ))}
            </div>
          )}
        </div>

        {filteredTrips.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--brown-light)', fontFamily: 'EB Garamond, serif', fontSize: 18, fontStyle: 'italic' }}>
            No upcoming trips scheduled. Check back soon! 🙏
          </div>
        ) : (
          <div className="trips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
            {filteredTrips.map(trip => (
              <div key={trip.id}
                onMouseEnter={() => setHovered(trip.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#fff', borderRadius: 14, overflow: 'hidden',
                  border: `1.5px solid ${hovered === trip.id ? 'var(--saffron)' : 'var(--border)'}`,
                  boxShadow: hovered === trip.id ? '0 10px 32px rgba(180,100,0,0.18)' : '0 4px 16px rgba(150,80,10,0.07)',
                  transform: hovered === trip.id ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 0.25s ease',
                }}>
                <div style={{ background: 'linear-gradient(135deg, #8B4513, #C8720A)', padding: '20px 18px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: -6, top: -6, fontSize: 64, opacity: 0.15 }}>{trip.image}</div>
                  {trip.category && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,232,160,0.65)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{trip.category}</span>}
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(15px, 4vw, 18px)', fontWeight: 700, color: '#FFE8A0', lineHeight: 1.3, marginBottom: 4 }}>{trip.destination}</h3>
                  <div style={{ color: 'rgba(255,232,160,0.7)', fontSize: 12 }}>📅 {trip.date}</div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700, color: 'var(--brown-dark)' }}>{trip.price}</div>
                    <div style={{
                      background: trip.seats <= 5 ? 'rgba(200,0,0,0.1)' : 'rgba(0,150,80,0.1)',
                      color: trip.seats <= 5 ? '#B00000' : '#006B3C', fontSize: 11, fontWeight: 600,
                      padding: '3px 10px', borderRadius: 20,
                      border: `1px solid ${trip.seats <= 5 ? 'rgba(200,0,0,0.2)' : 'rgba(0,150,80,0.2)'}`,
                    }}>{trip.seats <= 5 ? '🔥 ' : '✅ '}{trip.seats} seats</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                    {(trip.includes || []).map(inc => (
                      <span key={inc} style={{ background: 'var(--cream2)', border: '1px solid var(--border)', borderRadius: 5, padding: '2px 8px', fontSize: 11, color: 'var(--brown-mid)', fontWeight: 500 }}>✦ {inc}</span>
                    ))}
                  </div>
                  <a href="#feedback" style={{
                    display: 'block', textAlign: 'center',
                    background: 'linear-gradient(135deg, #8B4513, #C8720A)',
                    color: '#FFE8A0', textDecoration: 'none', borderRadius: 8,
                    padding: '10px', fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                  }}>📲 Enquire Now</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
