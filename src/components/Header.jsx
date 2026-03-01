import { useState, useEffect } from 'react'

export default function Header({ onAdminClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(251,246,239,0.97)' : 'rgba(251,246,239,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? '0 2px 20px rgba(150,80,10,0.1)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 20px',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 60,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>🪔</span>
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 700, color: 'var(--brown-dark)', letterSpacing: 1.5, lineHeight: 1.2 }}>VINAYAK TRAVELS</div>
              <div style={{ fontSize: 8, color: 'var(--saffron)', letterSpacing: 2, fontWeight: 600 }}>SACRED JOURNEYS</div>
            </div>
          </div>

          <nav className="desktop-nav" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {['Trips', 'Feedback'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
                color: 'var(--brown-mid)', textDecoration: 'none',
              }}>{item}</a>
            ))}
            <button onClick={onAdminClick} style={{
              background: 'linear-gradient(135deg, #8B4513, #C8720A)', color: '#FFE8A0',
              border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 12,
              fontWeight: 600, letterSpacing: 1, cursor: 'pointer',
            }}>⚙️ Admin</button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 6, display: 'flex', flexDirection: 'column', gap: 5,
          }}>
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--brown-dark)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--brown-dark)', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--brown-dark)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px 16px', background: 'rgba(251,246,239,0.98)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Trips', 'Feedback'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
                padding: '12px 16px', borderRadius: 8, fontFamily: 'Poppins, sans-serif',
                fontSize: 15, fontWeight: 500, color: 'var(--brown-dark)', textDecoration: 'none',
                background: 'var(--cream2)', display: 'block',
              }}>{item === 'Trips' ? '✈️' : '📝'} {item}</a>
            ))}
            <button onClick={() => { onAdminClick(); setMenuOpen(false) }} style={{
              background: 'linear-gradient(135deg, #8B4513, #C8720A)', color: '#FFE8A0',
              border: 'none', borderRadius: 8, padding: '12px 16px', fontSize: 14,
              fontWeight: 600, cursor: 'pointer', textAlign: 'left', marginTop: 2,
            }}>⚙️ Admin Panel</button>
          </div>
        )}
      </header>
      <style>{`
        .hamburger { display: none !important; }
        .desktop-nav { display: flex !important; }
        @media (max-width: 640px) {
          .hamburger { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}
