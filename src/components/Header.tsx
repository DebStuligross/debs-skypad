export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #7B8CDE, #5A6BC7)',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src="/deb-photo.png"
          alt="Deb"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.6)',
            objectFit: 'cover',
          }}
        />
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
          Deb's Skypad
          <span style={{ fontWeight: 300, opacity: 0.85, fontSize: 14, marginLeft: 8 }}>
            All your projects, one place
          </span>
        </h1>
      </div>
    </header>
  )
}
