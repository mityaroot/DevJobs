import { useState } from 'react'

import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import JobListing from '../components/JobListings'
import Pagination from '../components/Pagination'
import Search from '../components/SearchFormSection'
import heroImg from '@assets/hero.png'
import jobsData from '../data.json'

const RESULTS_PER_PAGE = 4

export default function App() {
    const [filters, setFilters] = useState({
      technology: '',
      location: '',
      experience: ''
    })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const jobsFilteredByFilters = jobsData.filter(job => {
        return (
            (filters.technology === '' || job.data.technology.includes(filters.technology)) &&
            (filters.location === '' || job.data.modalidad.includes(filters.location)) &&
            (filters.experience === '' || job.data.nivel.includes(filters.experience))
        )
    })

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

    // el handleSearch se pasa a la barra de busqueda
    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
        console.log('>>> Filtro aplicado: ', { filters })
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
        console.log('>>> Nuevo texto del filtro: ', { newTextToFilter })
    }

    return (
    <> 
      <Header />
        <main>
            <section className="hero">
                <img src={heroImg} width="200" />

                <h1>Encuentra tú próximo trabajo</h1>

                <p>Explora miles de oportunidades en el sector tecnológico.</p>

                <Search onSearch={handleSearch} onTextFilter={handleTextFilter} />

            </section>

            <JobListing jobs={pagedResults} />
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>
      <Footer />
    </>
  )
}
