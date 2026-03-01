import { useState } from 'react'

export default function AdminLogin({ onLogin, onBack }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      const ok = onLogin(password)
      if (!ok) {
        setError('Invalid password. Please try again.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse at 30% 50%, rgba(200,134,10,0.15) 0%, transparent 60%),
        linear-gradient(180deg, #FBF6EF 0%, #F5EDD8 100%)
      `,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative',
    }}>
      {/* Background OM */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 400, color: 'rgba(200,134,10,0.06)',
        fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none',
      }}>ॐ</div>

      <div style={{
        background: '#fff', borderRadius: 20, padding: '48px 44px',
        border: '1.5px solid var(--border)',
        boxShadow: '0 20px 60px rgba(150,80,10,0.15)',
        width: '100%', maxWidth: 420, position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🔐</div>
        <h2 style={{
          fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700,
          color: 'var(--brown-dark)', marginBottom: 6,
        }}>Admin Access</h2>
        <p style={{
          fontFamily: 'EB Garamond, serif', fontSize: 15, fontStyle: 'italic',
          color: 'var(--brown-light)', marginBottom: 32,
        }}>Enter your password to manage the portal</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              style={{
                width: '100%', padding: '13px 16px',
                background: 'var(--cream)', border: `1.5px solid ${error ? '#C0392B' : 'var(--border)'}`,
                borderRadius: 10, fontSize: 15, color: 'var(--brown-dark)',
                outline: 'none', fontFamily: 'Poppins, sans-serif',
                textAlign: 'center', letterSpacing: 3,
                transition: 'border-color 0.2s',
              }}
            />
            {error && (
              <p style={{ fontSize: 12, color: '#C0392B', marginTop: 6, fontWeight: 500 }}>
                ⚠️ {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #8B4513, #C8720A)',
              color: '#FFE8A0', border: 'none', borderRadius: 10,
              padding: '13px', fontSize: 14, fontWeight: 600,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              fontFamily: 'Cinzel, serif', letterSpacing: 2,
              boxShadow: loading ? 'none' : '0 6px 20px rgba(180,100,0,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? '⏳ Checking...' : '🚪 Enter Admin Panel'}
          </button>
        </form>

        <button
          onClick={onBack}
          style={{
            marginTop: 16, background: 'none', border: 'none',
            color: 'var(--brown-light)', fontSize: 13, cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', letterSpacing: 0.5,
            textDecoration: 'underline',
          }}
        >
          ← Back to Website
        </button>

        <div style={{
          marginTop: 24, padding: '10px 14px',
          background: 'rgba(200,134,10,0.08)', borderRadius: 8,
          border: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: 11, color: 'var(--brown-light)', fontWeight: 500 }}>
            💡 Contact admin for password
          </p>
        </div>
      </div>
    </div>
  )
}
