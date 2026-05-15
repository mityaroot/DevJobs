import styles from './Pagination.module.css'

export function Pagination ({ currentPage = 1, totalPages = 10, onPageChange }) {
  // generar un array de páginas a mostrar
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // determinar si estamos en la primera o última página para deshabilitar los botones correspondientes
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  // estilos para los botones de navegación
  const stylePrevButton = isFirstPage ? { pointerEvents: 'none', opacity: 0.5 } : {}
  const styleNextButton = isLastPage ? { pointerEvents: 'none', opacity: 0.5 } : {}

  // manejadores de eventos para los botones de navegación
  const handlePrevClick = (event) => {
    event.preventDefault()
    if (isFirstPage === false) {
      onPageChange(currentPage - 1)
    }
  }

  // manejador de evento para el cambio de página al hacer clic en un número de página
  const handleNextClick = (event) => {
    event.preventDefault()
    if (isLastPage === false) {
      onPageChange(currentPage + 1)
    }
  }

  // manejador de evento para el cambio de página al hacer clic en un número de página
  const handleChangePage = (event) => {
    event.preventDefault()
    const page = Number(event.target.dataset.page)

    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  // función para construir la URL de la página con el número de página como parámetro de consulta
  const buildPageUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

  // renderizar la paginación
  return (
    <nav className={styles.pagination}>
      
      // botón para ir a la página anterior, deshabilitado si estamos en la primera página
      <a href={buildPageUrl(currentPage - 1)} style={stylePrevButton} onClick={handlePrevClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>

      </a>
      

      // renderizar los números de página, resaltando el número de la página actual
      {pages.map((page) => (
        <a
          key={page}
          data-page={page}
          href={buildPageUrl(page)}
          className={currentPage === page ? styles.isActive : ''}
          onClick={handleChangePage}
        >
          {page}
        </a>
      ))}
      
      // botón para ir a la página siguiente, deshabilitado si estamos en la última página
      <a href={buildPageUrl(currentPage + 1)} style={styleNextButton} onClick={handleNextClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>

      </a>

      
    </nav>
  )
}