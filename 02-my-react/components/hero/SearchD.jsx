

function Search() {
    return (
        <form role="search">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>

                <input 
                id="empleos-search-input"
                required type="text" 
                placeholder="Buscar trabajos, empresas o habilidades"
                
                style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', width: '300px', maxWidth: '100%' }}
                />
            </div>
        </form>
    )
}

export default Search