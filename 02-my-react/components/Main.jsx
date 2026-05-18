
import Hero from "./Hero"

function Main() {
    return (
    <main>

        <Hero />
        
        <section 
        style={{ marginTop: '2rem', display: 'grid', gap: '1rem', textAlign: 'center' }}>

            <div 
            className="job-listing" 
                style={{ width: '100%', 
                maxWidth: '650px', border: '4px solid #ffffff2d', 
                borderRadius: '4px', paddingBottom: '2rem',
                backgroundColor: '#f9f9f94f',

                display: 'flex', justifyContent: 'center', 
                alignItems: 'center', flexDirection: 'column' }}>

                <h2 style={{ padding: '1rem 1rem 0 1rem', marginBottom: '1rem' }}>
                    Resultados de búsqueda
                </h2>


            </div>
        </section>


        <section>
            <nav style={{ marginTop: '2rem' }} className="pagination">
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>
            </a>
            </nav>

        </section>

    </main>
    )
}
export default Main
