import { useState } from "react"

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
    const buttonClass = isApplied ? 'is-applied' : ''

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

export default function JobCard({data, titulo, empresa, ubicacion, descripcion }) {
    const estilos = { marginTop: '1rem', border: '2px solid rgba(0, 51, 102, 0.6)', 
        padding: '20px', display: 'flex', justifyContent: 'space-between'}

/*     const numbers = [1,2,3]
    const [firstNumber, , thirdNumber] = numbers */

    /*className = "job-card"*/
    return (
        <article style={estilos} 
        className = "job-card"
        data-modalidad={data?.modalidad}
        data-nivel={data?.nivel}
        data-technology={data?.technology}
        >
            <div>
                <h2>{titulo}</h2>
                <small>{empresa} - {ubicacion}</small>
                 <p>{descripcion}</p>
                
            </div>

            <div style = {{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: 'auto' }}>
                <span>{data?.modalidad}</span>
                <span>{data?.nivel}</span>
                <span>{data?.technology}</span>

                <ApplyButton />
            </div>

            
        </article>
        
    )
}
