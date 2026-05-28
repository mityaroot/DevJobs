import {Link} from './Link.jsx';

export default function Header() {
  return (
    <header style={{ padding: '1rem 2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', textDecoration: 'none' }}>
            <h1 style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                DevJobs
            </h1>
        </Link>

            <nav>
                <Link href="/search" className="nav-link">Empleos</Link>
            </nav>

            <nav>
                <Link href="/contact" className="nav-link">Contacto</Link>
            </nav>

            <nav>
                <Link href="/404" className="nav-link">404</Link>
            </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexWrap: 'wrap' }}>
            <div
                style={{ borderRadius: '25px', padding: '0.5rem 1rem', backgroundColor: '#b44cce', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Link href="">Subir CV</Link>
            </div>
        </div>

    </header>
  )
}

