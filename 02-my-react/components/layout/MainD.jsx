
import React, { useState } from "react"
import JobData from "../../data.json"

import Hero from "../hero/HeroD"
import JobListing from "../job/JobListingD"
import Pagination from "../job/PaginationD"

const RESULTS_PER_PAGE = 4

export default function Main() {
    console.log('🔵 App.MainD renderizado')

    const [currentPage, setCurrentPage] = React.useState(1)
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experienceLevel: ''
    })
    const [textToFilter, setTextToFilter] = useState('')

    const filteredJobs = JobData.filter((job) => {
        return (
            (filters.technology === '' || job.data.technology.includes(filters.technology)) &&
            (filters.location === '' || job.data.modalidad.includes(filters.location)) &&
            (filters.experienceLevel === '' || job.data.nivel.includes(filters.experienceLevel))
        )
    })

    const searchedJobs = textToFilter === ''
        ? filteredJobs
        : filteredJobs.filter(job =>
            job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
        )

    const totalPages = Math.ceil(searchedJobs.length / RESULTS_PER_PAGE)
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
    const currentJobs = searchedJobs.slice(startIndex, startIndex + RESULTS_PER_PAGE)

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextChange = (text) => {
        setTextToFilter(text)
        setCurrentPage(1)
    }

    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1)
        }
    }, [totalPages, currentPage])

    return (
    <main>
        <Hero onSearch={handleSearch} onTextChange={handleTextChange} />
        <JobListing jobs={currentJobs} />
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
    </main>
    )
}
