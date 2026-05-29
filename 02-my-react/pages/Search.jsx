import { useEffect, useState } from 'react'

import '../src/App.css'
import JobListing from '../components/JobListings'
import Pagination from '../components/Pagination'
import Search from '../components/SearchFormSection'
import heroImg from '@assets/hero.png'

const RESULTS_PER_PAGE = 4

const useFilters = () => {
    // Estados
    const [filters, setFilters] = useState({
      technology: '',
      modalidad: '',
      nivel: ''
    })
    const [textToFilter, setTextToFilter] = useState('') // Filtro en tiempo real, por defecto ''
    const [currentPage, setCurrentPage] = useState(1) // Pagina actual, por defecto 1

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [initialTotal, setInitialTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchJobs() {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                if (textToFilter) { params.append('text', textToFilter)}
                if (filters.technology) { params.append('technology', filters.technology)}
                if (filters.modalidad) { params.append('modalidad', filters.modalidad)}
                if (filters.nivel) { params.append('nivel', filters.nivel)}

                const queryParams = params.toString()
                console.log('>>> URL de fetch:', `https://jscamp-api.vercel.app/api/jobs?${queryParams}`)

                await new Promise((resolve) => setTimeout(resolve, 1000))
                const res = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await res.json()

                setJobs(json.data)
                setTotal(json.total)
                if (!filters.technology && !filters.modalidad && !filters.nivel && !textToFilter) {
                    setInitialTotal(json.total)
                }
            } catch (error) {
                console.error('Error fetching jobs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()

    }, [filters, textToFilter, currentPage]) // cuando se ejecuta el efecto


    
    
    const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

    const pagedResults = jobs.slice(
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

    return {
        jobs: pagedResults,
        total,
        initialTotal,
        allJobs: jobs,
        loading,
        filters,
        textToFilter,
        currentPage,
        totalPages,
        handleSearch,
        handleTextFilter,
        setCurrentPage
    }
}

export function SearchPage() {
    const { 
        jobs,
        total,
        initialTotal,
        allJobs,
        loading,
        filters, 
        textToFilter, 
        currentPage, 
        totalPages, 
        handleSearch, 
        handleTextFilter, 
        setCurrentPage
    } = useFilters()

    // Actualizamos la URL con los mismos filtros
    // no lo mezclamos con useFilters, porque useFilters se ejecuta en cada renderizado
    useEffect(() => {

        document.title = `Buscando: ${total}, Page ${currentPage} - DevJobs`

        console.log('>>> Actualizando la URL')
    }, [total, currentPage]) 


    return (
    <> 
        <main>
            <section className="hero">
                <img src={heroImg} width="200" />

                <h1>Encuentra tú próximo trabajo</h1>

                <p>Explora miles de oportunidades en el sector tecnológico.</p>

                <Search onSearch={handleSearch} onTextFilter={handleTextFilter} filteredJobs={total} totalJobs={initialTotal} />

            </section>

            {
                loading ? 
                <p style={{textAlign: 'center'}}>
                    Estamos cargando tus resultados...
                </p> 
                : <JobListing jobs={jobs} />
            }
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>

    </>
  )
}
