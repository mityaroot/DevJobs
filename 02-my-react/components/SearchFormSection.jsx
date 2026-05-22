import {useId} from 'react'

import jobsData from '../data.json'

export default function Search({onTextFilter, onSearch}) {
    // IDs que se usaran en el formulario
    const isSearchInputText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperience = useId()

    // Manejador de envio del formulario
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        onTextFilter(new FormData(e.target).get('search') || '')
    }

    // Manejador de cambio en los select
    const handleSelectFilterSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onSearch({
            technology: formData.get(idTechnology) || '',
            location: formData.get(idLocation) || '',
            experience: formData.get(idExperience) || ''
        })

        console.log('>>> Filtros: ', {
            technology: formData.get(idTechnology) || '',
            location: formData.get(idLocation) || '',
            experience: formData.get(idExperience) || ''
        })
    }

    // Manejador de cambio en el input de texto
    const handleInputTextChange = (e) => {
        const text = e.target.value
        onTextFilter(text)
        console.log('>>> Texto del filtro: ', { text })
    }

    // onFocus y onBlur

    return (
        <>
        <form role="search" onSubmit={handleSearchSubmit}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>

                <input
                    name="search"
                    id={isSearchInputText}
                    className="empleos-search-input"
                        required type="text"
                        placeholder="Buscar trabajos, empresas o habilidades"

                        style={{ padding: '0.5rem 1rem', border: 'none',
                            borderRadius: '4px', width: '300px', maxWidth: '100%'
                        }}

                    onChange={handleInputTextChange}
                    // onFocus={} // Se ejecuta cuando el usuario hace clic en el input
                    // onBlur={} // Se ejecuta cuando el usuario hace clic fuera del input
                />

                <button type="submit"
                    style={{ padding: '0.5rem 1rem', border: 'none',
                        borderRadius: '4px', backgroundColor: '#334155',
                        color: 'white', cursor: 'pointer' 
                    }}>
                Buscar
                </button>
            </div>
        </form>

        <form
        onSubmit={handleSelectFilterSubmit}
        className="search-filters"
        style={{ display: 'flex', gap: '1.5rem', alignItems: 'center',
        flexWrap: 'wrap', marginTop: '1rem', marginLeft: '3rem', marginRight: '1rem'
        }}>

            
            <button // Boton para limpiar los filtros
                id="btn-reset-filters" type="button"
                // onClick={handleReset}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem', backgroundColor: '#e53e3e', color: 'white',
                border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Limpiar filtros
            </button>

            <select name={idTechnology}>
                <option value="">Todas las tecnologías</option>
                <option value="react">React</option>
                <option value="node">Node.js</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="mobile">Mobile / Otros</option>
            </select>

            <select name={idLocation}>
                <option value="">Todas las ubicaciones</option>
                <option value="remoto">Remoto</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelona</option>
                <option value="valencia">Valencia</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
                <option value="bogota">Bogotá</option>
                <option value="bsas">Buenos Aires</option>
                <option value="santiago">Santiago de Chile</option>
                <option value="lima">Lima</option>
            </select>

            <select name={idExperience}>
                <option value="">Todos los niveles</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="intern">Prácticas</option>
                <option value="freelance">Freelance</option>
            </select>

            <button type="submit"
                style={{ padding: '0.5rem 1rem', border: 'none',
                borderRadius: '4px', backgroundColor: '#334155',
                color: 'white', cursor: 'pointer' }}>
                Filtrar
            </button>
        </form>

        </>
    )
}
