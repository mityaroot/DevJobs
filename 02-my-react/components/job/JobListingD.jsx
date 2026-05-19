import JobCard from './JobCardD.jsx'

export default function JobListing({data, titulo, empresa, ubicacion, descripcion }) {
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
                alignItems: 'center', flexDirection: 'column' }}>

                <h2 style={{ padding: '1rem 1rem 0 1rem', marginBottom: '1rem' }}>
                    Resultados de búsqueda
                </h2>

                <JobCard
                    titulo="Desarrollo 0"
                    empresa="Tech Solution" 
                    ubicacion="Remoto"
                    descripcion="Buscamos un desarrollador para varias cosas chulas dentro de la empresa."
                    data={{modalidad: "remoto", nivel: "junior", technology: "react"}}
                />
                <JobCard
                    titulo="Desarrollo 1"
                    empresa="Tech Solution" 
                    ubicacion="Remoto"
                    descripcion="Buscamos un desarrollador para varias cosas chulas dentro de la empresa."
                />
                <JobCard
                    titulo="Desarrollo 2"
                    empresa="Tech Solution" 
                    ubicacion="Remoto"
                    descripcion="Buscamos un desarrollador para varias cosas chulas dentro de la empresa."
                />
                <JobCard
                    titulo="Desarrollo 3"
                    empresa="Tech Solution" 
                    ubicacion="Remoto"
                    descripcion="Buscamos un desarrollador para varias cosas chulas dentro de la empresa."
                />

            </div>
        </section>
    )
}
