
import React from "react"
import JobData from "../../data.json"

import Hero from "../hero/HeroD"
import JobListing from "../job/JobListingD"
import Pagination from "../job/PaginationD"

const ITEMS_PER_PAGE = 4

export default function Main() {
    console.log('🔵 App.MainD renderizado')

    const [currentPage, setCurrentPage] = React.useState(1)
    const totalPages = Math.ceil(JobData.length / ITEMS_PER_PAGE)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentJobs = JobData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Manejar el cambio de página
    React.useEffect(() => {
        // Si la página actual supera el total de páginas, se vuelve a la primera
        if (currentPage > totalPages) {
            setCurrentPage(1)
        }
    }, [totalPages, currentPage]) // Dependencias: totalPages y currentPage para detectar cambios

    return (
    <main>

        <Hero />
        
        <JobListing jobs={currentJobs} />

        <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
        />

    </main>
    )
}

