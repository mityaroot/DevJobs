import JobCard from './JobCard'

export default function JobListing({ jobs }) {
    return (
        <section 
        style={{ marginTop: '2rem', display: 'grid', gap: '1rem', textAlign: 'center' }}>

            <div 
            className="job-listing" 
                style={{ width: '100%', 
                maxWidth: '900px', border: '4px solid #ffffff2d', 
                borderRadius: '4px', paddingBottom: '2rem',
                backgroundColor: '#f9f9f94f',

                display: 'flex', justifyContent: 'center', 
                alignItems: 'center', flexDirection: 'column' 
                }}>

                <h2 className="section-title" style={{ padding: '1rem 1rem 0 1rem', marginBottom: '1rem' }}>
                    Resultados de búsqueda
                </h2>

                {
                    jobs.length === 0 && (
                        <p style={{ color: '#777', marginBottom: '1rem', textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>
                            No se encontraron ofertas de empleo para tu búsqueda.
                        </p>
                    )
                }

                {jobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                    />
                ))}

            </div>
        </section>
    )
}
