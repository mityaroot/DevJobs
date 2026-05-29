import { useState } from "react"

export default function JobCard({job}) {
    const [showExtra, setShowExtra] = useState(false)

    const estilos = { marginTop: '1rem', border: '2px solid rgba(0, 51, 102, 0.6)', 
        padding: '24px', display: 'flex', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap'}

    return (
        <article style={estilos} 
        className = "job-card"
        data-technology={job.data?.technology}
        data-modalidad={job.data?.modalidad}
        data-nivel={job.data?.nivel}
        >
            <div className="job-card-left" style={{ borderRight: '1px solid rgba(255,255,255,0.15)', paddingRight: '1rem', flex: 1 }}>
                <h2>{job.titulo}</h2>
                <small>{job.empresa} - {job.ubicacion}</small>
                 <p>{job.descripcion}</p>
                
            </div>

            <div style = {{display: 'flex', flexDirection: 'column', gap: '0.75rem',
                 marginLeft: 'auto', maxWidth: '220px', wordBreak: 'break-word' }}>
                <span style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.3rem' }}>{job.data?.modalidad}</span>
                <span style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.3rem' }}>{job.data?.nivel}</span>
                <span>{job.data?.technology}</span>

                <div style={{ marginTop: '0.5rem' }}>
                    <ApplyButton />
                </div>
            </div>
            
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                <BotonMostrarAdicional isOpen={showExtra} onToggle={() => setShowExtra(!showExtra)} />
            </div>

            {showExtra && (
                <div className="job-card-aditional-info" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}> 
                    <MostrarContenidoAdicional job={job} />
                </div>
            )}

        </article>
        
    )
}

function BotonMostrarAdicional({ isOpen, onToggle }) {
    return (
        <button
            onClick={onToggle}
            style={{ display: 'flex', height: '40px', width: '40px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', border: '2px solid rgba(0, 51, 102, 0.6)', borderRadius: '50%', color: 'rgb(255, 255, 255)', backgroundColor: 'rgba(0, 51, 102, 0.6)', cursor: 'pointer' }}
        >
            {isOpen ? '−' : '+'}
        </button>
    )
}

function MostrarContenidoAdicional({ job }){
    const content = job.data?.content || {}
    return (
        <>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6' }}>Información adicional</h3>
            <h4 style={{ margin: '0.5rem 0 0.25rem 0', color: '#94a3b8' }}>Descripción completa</h4>
            <p style={{ margin: 0, color: '#cbd5e1' }}>{content.description || job.descripcion}</p>
            <>
                <h4 style={{ margin: '0.5rem 0 0.25rem 0', color: '#94a3b8' }}>Responsabilidades</h4>
                <p style={{ margin: 0, color: '#cbd5e1' }}>{content.responsibilities || 'No especificadas'}</p>
            </>
            <>
                <h4 style={{ margin: '0.5rem 0 0.25rem 0', color: '#94a3b8' }}>Requisitos</h4>
                <p style={{ margin: 0, color: '#cbd5e1' }}>{content.requirements || 'No especificados'}</p>
            </>
            <>
                <h4 style={{ margin: '0.5rem 0 0.25rem 0', color: '#94a3b8' }}>Acerca de la empresa</h4>
                <p style={{ margin: 0, color: '#cbd5e1' }}>{content.about || 'No disponible'}</p>
            </>
        </>
    )
}


function ApplyButton() {
    // Declarar estado
    const [
        isApplied, 
        setIsApplied
    ] = useState(false) // si no se hubiera importado arriba sería React.useState(false)

    function handleApply() {
        setIsApplied(!isApplied)
    }

    const textButton = isApplied ? '¡Aplicado!' : 'Aplicar'
    const buttonClass = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'

    /** Si el usuario ha aplicado, se muestra el texto que aparece a modo de constante.
     * {isApplied ? '¡Aplicado!' : 'Aplicar'}
     * 
    */
    return (
        <button
            className={`button-apply-job ${buttonClass}`}
            onClick={() => handleApply()}
            disabled={isApplied}
            style={{ height: '40px' }}
        >
            {textButton}
        </button>
    )

}
