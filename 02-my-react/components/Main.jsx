
function Main() {
    return (
    <main>

        <section class="hero">
            <img src="../resources/background.webp" width="200" />

            <h1>Encuentra tú próximo trabajo</h1>

            <p>Explora miles de oportunidades en el sector tecnológico.</p>

            <form role="search">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-search">
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
        

        <div 
        class="search-filters"
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem', marginLeft: '3rem', marginRight: '1rem' }}>
        
            <button type="button" 
            id="btn-reset-filters" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Limpiar filtros
            </button>

            <select id="filter-technology" name="technology">
                <option value="">Todas las tecnologías</option>
                <option value="react">React</option>
                <option value="node">Node.js</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="mobile">Mobile / Otros</option>
            </select>

            <select id="filter-location" name="location">
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

            <select id="filter-level">
                <option value="">Todos los niveles</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>

                <hr />

                <option value="intern">Prácticas</option>
                <option value="freelance">Freelance</option>
            </select>
        </div>

        </section>


        
            <section 
            style={{ marginTop: '2rem', display: 'grid', gap: '1rem', textAlign: 'center' }}>
    
                <div 
                class="job-listing" 
                    style={{ width: '100%', 
                    maxWidth: '650px', border: '4px solid #ffffff2d', 
                    borderRadius: '4px', paddingBottom: '2rem',
                    backgroundColor: '#f9f9f94f',

                    display: 'flex', justifyContent: 'center', 
                    alignItems: 'center', flexDirection: 'column' }}>

                    <h2 style={{ padding: '1rem 1rem 0 1rem', marginBottom: '1rem' }}>
                        Resultados de búsqueda
                    </h2>


                </div>
            </section>


            <section>
                <nav style={{ marginTop: '2rem' }} class="pagination">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </a>
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                    </svg>
                </a>
                </nav>

            </section>

        </main>
    )
}

export default Main