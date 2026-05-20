import JobCard from './JobCardD.jsx'

export default function JobListing({ jobs = [] }) {
    return (
        <section 
        style={{ marginTop: '2rem', display: 'grid', gap: '1rem', textAlign: 'center' }}>

            <div 
            className="job-listing" 
                style={{ width: '100%', 
                maxWidth: '650px', border: '4px solid #ffffff2d', 
                borderRadius: '4px', paddingBottom: '2rem',
                backgroundColor: '#f9f9f94f',

                display: 'flex', justifyContent: 'center', 
                alignItems: 'center', flexDirection: 'column' 
                }}>

                <h2 style={{ padding: '1rem 1rem 0 1rem', marginBottom: '1rem' }}>
                    Resultados de búsqueda
                </h2>

                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        titulo={job.titulo}
                        empresa={job.empresa}
                        ubicacion={job.ubicacion}
                        descripcion={job.descripcion}
                        data={job.data}
                    />
                ))}

            </div>
        </section>
    )
}
