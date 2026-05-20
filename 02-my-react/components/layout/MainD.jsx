
import Hero from "../hero/HeroD"
import JobCard from "../job/JobCardD"
import JobListing from "../job/JobListingD"
import Pagination from "../job/PaginationD"

export default function Main() {

    const handlePageChange = (page) => {
        // Lógica para cambiar la página actual
    }

    return (
    <main>

        <Hero />
        
        <JobListing />

        <Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange}/>

    </main>
    )
}

