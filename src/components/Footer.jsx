export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #3A1200, #6B2E00)', padding: '40px 20px 20px', color: '#E8C880' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 28, marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 26 }}>🪔</span>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 700, color: '#FFD580', letterSpacing: 2 }}>VINAYAK TRAVELS</div>
                <div style={{ fontSize: 8, color: 'rgba(255,213,128,0.6)', letterSpacing: 2 }}>SACRED JOURNEYS</div>
              </div>
            </div>
            <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 14, fontStyle: 'italic', color: 'rgba(232,200,128,0.7)', lineHeight: 1.6 }}>
              Bringing devotees closer to the divine.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: '#FFD580', textTransform: 'uppercase', marginBottom: 12 }}>Contact Us</h4>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: 'rgba(232,200,128,0.8)' }}>
              <div>📱 Aakash: 7875077679</div>
              <div>📱 Priyanshu: 8850218401</div>
              <div>📱 Ankush: 9082028736</div>
              <div>📍 Vasai, Maharashtra</div>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: '#FFD580', textTransform: 'uppercase', marginBottom: 12 }}>Pickup Points</h4>
            <div style={{ fontSize: 13, lineHeight: 2.2, color: 'rgba(232,200,128,0.8)' }}>
              <div>🚌 Vasai (W)</div>
              <div>🚌 KashiMira</div>
              <div>🚌 Borivali</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(200,134,10,0.2)', paddingTop: 16, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: 'rgba(255,213,128,0.6)', letterSpacing: 3, marginBottom: 6 }}>🌺 Har Har Mahadev 🌺</div>
          <div style={{ fontSize: 11, color: 'rgba(232,200,128,0.35)' }}>© {new Date().getFullYear()} Vinayak Travels. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
