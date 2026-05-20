
// valores por defecto 1 y 10
export default function Pagination({currentPage = 1, totalPages = 10}) {
    // Generar array de páginas a mostrar
/*    const pages = [];
     for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    } */

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    // Generar array de páginas a mostrar usando Array.from 
    // Array.from() crea un nuevo array
    // (_, i) => i + 1 transforma cada índice en un número de página
    // No es null. Es el primer argumento del callback: el elemento del array en esa posición. Array.from({ length: n }, (elemento, indice) => ...).
    // En este caso { length: totalPages } es un array-like vacío (sin elementos reales), así que _ es undefined para cada iteración. Se usa _ por convención para indicar "no me interesa este parámetro".
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const stylePrevButton = currentPage === 1 ? { pointerEvents: 'none', opacity: 0.5 } : {}
    const styleNextButton = currentPage === totalPages ? { pointerEvents: 'none', opacity: 0.5 } : {}

    const handlePrevClick = (event) => {
        event.preventDefault()
        if (isFirstPage === false) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextClick = (event) => {
        event.preventDefault()
        if (isLastPage === false) {
            onPageChange(currentPage + 1)
        }
    }

    const handleChangePage = (event, page) => {
        event.preventDefault()
        if (page !== currentPage) {
            onPageChange(page)
        }
    }

    return(
        <section>
            <nav style={{ marginTop: '2rem' }} className="pagination">

            {
                <a href="#" style={stylePrevButton} onClick={handlePrevClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </a>
            }
             
            {pages.map((page) => (
                <a key={page}  
                className={currentPage === page ? 'is-active' : ''} 
                href ="#"
                onClick ={(e) => handleChangePage(e, page)}
                >
                    {page}
                </a>
            ))}

            {

                <a href="#" style={styleNextButton} onClick={handleNextClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                    </svg>
                </a>
                
            }
            
            </nav>

        </section>
    )
}