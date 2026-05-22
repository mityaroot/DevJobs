
export default function Header() {
  return (
    <header style={{ padding: '1rem 2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                DevJobs
            </h1>

            <nav>
                <a href="index.html" className="nav-link">Empleos</a>
            </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexWrap: 'wrap' }}>
            <div
                style={{ borderRadius: '25px', padding: '0.5rem 1rem', backgroundColor: '#b44cce', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <a href="">Subir CV</a>
            </div>
        </div>

    </header>
  )
}

