import { useState } from "react"

export default function JobCard({job}) {
    const estilos = { marginTop: '1rem', border: '2px solid rgba(0, 51, 102, 0.6)', 
        padding: '24px', display: 'flex', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap'}

/*     const numbers = [1,2,3]
    const [firstNumber, , thirdNumber] = numbers */

    /*className = "job-card"*/
    return (
        <article style={estilos} 
        className = "job-card"
        data-modalidad={job.data?.modalidad}
        data-nivel={job.data?.nivel}
        data-technology={job.data?.technology}
        >
            <div className="job-card-left" style={{ borderRight: '1px solid rgba(255,255,255,0.15)', paddingRight: '1rem', flex: 1 }}>
                <h2>{job.titulo}</h2>
                <small>{job.empresa} - {job.ubicacion}</small>
                 <p>{job.descripcion}</p>
                
            </div>

            <div style = {{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: 'auto', maxWidth: '220px', wordBreak: 'break-word' }}>
                <span style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.3rem' }}>{job.data?.modalidad}</span>
                <span style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.3rem' }}>{job.data?.nivel}</span>
                <span>{job.data?.technology}</span>

                <div style={{ marginTop: '0.5rem' }}>
                    <ApplyButton />
                </div>
            </div>

            
        </article>
        
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
