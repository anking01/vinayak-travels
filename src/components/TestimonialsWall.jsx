export default function TestimonialsWall({ feedbacks }) {
  const visibleFeedbacks = feedbacks.filter(f => f.name)

  const StarDisplay = ({ count }) => (
    <span style={{ color: '#FFB800', fontSize: 14 }}>
      {'★'.repeat(Math.round(count))}{'☆'.repeat(5 - Math.round(count))}
    </span>
  )

  return (
    <section id="reviews" style={{
      padding: '80px 24px',
      background: 'linear-gradient(180deg, #F5EDD8 0%, #FBF6EF 100%)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: 4,
            color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 10,
          }}>Blessed Travellers</div>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 12,
          }}>What Pilgrims Say</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
            <span style={{ color: 'var(--saffron)', fontSize: 18 }}>✦</span>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
          </div>
        </div>

        {visibleFeedbacks.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: 16,
            border: '1.5px dashed var(--border)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🕊️</div>
            <p style={{
              fontFamily: 'EB Garamond, serif', fontSize: 20, fontStyle: 'italic',
              color: 'var(--brown-light)',
            }}>
              Be the first to share your sacred journey experience!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {visibleFeedbacks.map((fb, idx) => {
              const textAnswers = Object.entries(fb.answers || {})
                .filter(([_, v]) => typeof v === 'string' && v.length > 10)
              const mainQuote = textAnswers[0]?.[1] || null

              return (
                <div key={fb.id || idx} style={{
                  background: '#fff',
                  borderRadius: 14,
                  padding: '22px 22px 18px',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(150,80,10,0.07)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Quote mark */}
                  <div style={{
                    position: 'absolute', top: 10, right: 16,
                    fontFamily: 'Georgia, serif', fontSize: 60,
                    color: 'rgba(200,134,10,0.1)', lineHeight: 1,
                  }}>"</div>

                  {/* Rating */}
                  <div style={{ marginBottom: 10 }}>
                    <StarDisplay count={fb.avgRating || 5} />
                    <span style={{
                      marginLeft: 6, fontSize: 12, fontWeight: 600,
                      color: 'var(--brown-light)',
                    }}>{fb.avgRating || 5}/5</span>
                  </div>

                  {/* Quote */}
                  {mainQuote && (
                    <p style={{
                      fontFamily: 'EB Garamond, serif',
                      fontSize: 15, fontStyle: 'italic',
                      color: 'var(--brown-mid)', lineHeight: 1.6,
                      marginBottom: 14,
                    }}>"{mainQuote}"</p>
                  )}

                  {/* Divider */}
                  <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />

                  {/* Name & trip */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{
                        fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600,
                        color: 'var(--brown-dark)',
                      }}>{fb.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--saffron)', fontWeight: 500, marginTop: 2 }}>
                        🕌 {fb.tripName}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 10, color: 'var(--brown-light)', fontWeight: 500,
                    }}>{fb.date}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
