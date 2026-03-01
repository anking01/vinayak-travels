export default function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at 20% 50%, rgba(200,134,10,0.12) 0%, transparent 60%), linear-gradient(180deg, #FBF6EF 0%, #F5EDD8 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '90px 20px 50px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(180px, 45vw, 480px)', color: 'rgba(200,134,10,0.05)',
        fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>ॐ</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, width: '100%' }}>
        <div style={{ fontSize: 'clamp(40px, 10vw, 60px)', marginBottom: 14, animation: 'float 3s ease-in-out infinite' }}>🪔</div>

        <div style={{
          display: 'inline-block', background: 'rgba(200,134,10,0.12)',
          border: '1px solid rgba(200,134,10,0.3)', borderRadius: 20, padding: '5px 16px',
          fontSize: 'clamp(9px, 2.5vw, 11px)', fontWeight: 600, letterSpacing: 2.5,
          color: 'var(--saffron)', textTransform: 'uppercase', marginBottom: 16,
        }}>Har Har Mahadev</div>

        <h1 style={{
          fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 8vw, 62px)',
          fontWeight: 900, color: 'var(--brown-dark)', lineHeight: 1.1, marginBottom: 14,
        }}>
          Share Your<br />
          <span style={{
            background: 'linear-gradient(135deg, #8B4513, #C8720A, #FFD580)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Sacred Journey</span>
        </h1>

        <p style={{
          fontFamily: 'EB Garamond, serif', fontSize: 'clamp(14px, 3.5vw, 19px)',
          fontStyle: 'italic', color: 'var(--brown-light)', lineHeight: 1.7, marginBottom: 28, padding: '0 4px',
        }}>
          Every pilgrimage tells a story. Your experience helps fellow devotees plan their divine journey.
        </p>

        <div className="hero-btns" style={{ display: 'flex', gap: 10, justifyContent: 'center', padding: '0 4px' }}>
          <a href="#feedback" style={{
            background: 'linear-gradient(135deg, #8B4513, #C8720A)', color: '#FFE8A0',
            textDecoration: 'none', borderRadius: 10, padding: '13px 24px',
            fontSize: 'clamp(12px, 3.5vw, 14px)', fontWeight: 600,
            boxShadow: '0 6px 20px rgba(180,100,0,0.3)', display: 'block', flex: 1, maxWidth: 200, textAlign: 'center',
          }}>🙏 Share Feedback</a>
          <a href="#trips" style={{
            background: 'transparent', color: 'var(--saffron)', textDecoration: 'none',
            borderRadius: 10, padding: '13px 24px', fontSize: 'clamp(12px, 3.5vw, 14px)', fontWeight: 600,
            border: '1.5px solid var(--saffron)', display: 'block', flex: 1, maxWidth: 200, textAlign: 'center',
          }}>✈️ Trips</a>
        </div>

        <div className="hero-stats" style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 44 }}>
          {[{ num: '5000+', label: 'Happy Pilgrims' }, { num: '50+', label: 'Destinations' }, { num: '8 Years', label: 'Of Service' }].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(16px, 5vw, 24px)', fontWeight: 700, color: 'var(--brown-dark)' }}>{stat.num}</div>
              <div style={{ fontSize: 'clamp(9px, 2.5vw, 11px)', color: 'var(--brown-light)', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
