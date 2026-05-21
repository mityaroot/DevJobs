import {useId} from 'react'

export default function Search({handleTextChange}) {
    const searchInput = useId()

    const handleSubmit = (e) => {
        e.preventDefault()
        const value = e.target[0].value
        handleTextChange(value)
    }

    return (
        <form role="search" onSubmit={handleSubmit}>
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
                id={searchInput}
                className="empleos-search-input"
                required type="text"
                placeholder="Buscar trabajos, empresas o habilidades"

                style={{ padding: '0.5rem 1rem', border: 'none',
                borderRadius: '4px', width: '300px', maxWidth: '100%'
                }}

                onChange={(e) => handleTextChange(e.target.value)}
                />

                <button type="submit"
                style={{ padding: '0.5rem 1rem', border: 'none',
                    borderRadius: '4px', backgroundColor: '#334155',
                    color: 'white', cursor: 'pointer' }}>
                    Buscar
                </button>
            </div>
        </form>
    )
}
