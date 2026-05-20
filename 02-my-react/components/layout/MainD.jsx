
import React from "react"

import Hero from "../hero/HeroD"
import JobCard from "../job/JobCardD"
import JobListing from "../job/JobListingD"
import Pagination from "../job/PaginationD"

export default function Main() {
    console.log('🔵 App.MainD renderizado')

    const [currentPage, setCurrentPage] = React.useState(1)
    const totalPages = 5

    const handlePageChange = (page) => {
        console.log(`Cambiando a la página ${page}`)
        setCurrentPage(page)
    }

    return (
    <main>

        <Hero />
        
        <JobListing />

        <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
        />

    </main>
    )
}

