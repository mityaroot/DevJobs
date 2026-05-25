import { useEffect, useState } from 'react'

import '../src/App.css'
import JobListing from '../components/JobListings'
import Pagination from '../components/Pagination'
import Search from '../components/SearchFormSection'
import heroImg from '@assets/hero.png'
import jobsData from '../data.json'

const RESULTS_PER_PAGE = 4

export function SearchPage() {

    // Estados
    const [filters, setFilters] = useState({
      technology: '',
      location: '',
      experience: ''
    })
    const [textToFilter, setTextToFilter] = useState('') // Filtro en tiempo real, por defecto ''
    const [currentPage, setCurrentPage] = useState(1) // Pagina actual, por defecto 1

    // Filtrar por los selects
    const jobsFilteredByFilters = jobsData.filter(job => {
        return (
            (filters.technology === '' || job.data.technology.includes(filters.technology)) &&
            (filters.location === '' || job.data.modalidad.includes(filters.location)) &&
            (filters.experience === '' || job.data.nivel.includes(filters.experience))
        )
    })

    // Filtrar por texto (le aplicamos a los demas filtros el filtro por texto en tiempo real) 
    const jobsWithTextFilter = textToFilter === ''
        ? jobsFilteredByFilters
        : jobsFilteredByFilters.filter(job => { 
            return (job.titulo.toLowerCase().includes(textToFilter.toLowerCase()) 
                || job.empresa.toLowerCase().includes(textToFilter.toLowerCase()) 
                || job.data.modalidad.toLowerCase().includes(textToFilter.toLowerCase())
            )
        })
        
    const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

    const pagedResults = jobsWithTextFilter.slice(
        (currentPage - 1) * RESULTS_PER_PAGE, //Pagina 1 empieza en 0, pagina 2 empieza en 5, pagina 3 empieza en 10
        currentPage * RESULTS_PER_PAGE // pagina 1 empieza en 5, pagina 2 empieza en 10, pagina 3 empieza en 15
    )

    // el hadlePageChange se pasa a la paginación
    //

    // el handleSearch se pasa a la barra de busqueda, para el filtro
    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
        console.log('>>> Filtro aplicado: ', { filters })
    }

    // el handleTextFilter se pasa a la barra de busqueda, para el filtro en tiempo real
    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
        console.log('>>> Nuevo texto del filtro: ', { newTextToFilter })
    }

    // Actualizamos la URL con los mismos filtros
    useEffect(() => {

        document.title = `Buscando: ${jobsWithTextFilter.length}, Page ${currentPage} - DevJobs`

        console.log('>>> Actualizando la URL')
    }, [filters, currentPage, textToFilter]) // Si cambian los filtros, se actualiza la URL

    useEffect(() => {

        const handleResize = () => {
            console.log('>>> Ventana redimensionada')
            console.log(window.innerWidth, window.innerHeight)
        }

        // Escuchar el evento, nos suscribimos
        window.addEventListener('resize', handleResize)

        // Limpieza si se ejecuta antes de desmontar o antes de re-ejecutar, nos desuscribimos
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        
    }, [])

    return (
    <> 
        <main>
            <section className="hero">
                <img src={heroImg} width="200" />

                <h1>Encuentra tú próximo trabajo</h1>

                <p>Explora miles de oportunidades en el sector tecnológico.</p>

                <Search onSearch={handleSearch} onTextFilter={handleTextFilter} filteredJobs={jobsWithTextFilter.length} />

            </section>

            <JobListing jobs={pagedResults} />
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>

    </>
  )
}
