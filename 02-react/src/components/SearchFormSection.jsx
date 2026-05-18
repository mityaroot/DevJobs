import { useId, useState, useRef } from "react"

const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter }) => {
  const timeoutId = useRef(null)
  const [searchText, setSearchText] = useState("")

  // Este handleSubmit se ejecutará cada vez que cambie cualquier input del formulario, 
  // pero solo llamará a onSearch si el cambio no es del input de texto (que se maneja 
  // en handleTextChange)

  // ¿qué es el event? Es un objeto que representa el evento que ocurrió, en este caso el cambio en el formulario.
  // event.preventDefault() se llama para evitar que el formulario se envíe de forma tradicional, lo cual recargaría la página.
  // Luego, se crea un objeto FormData a partir del formulario actual (event.currentTarget), lo que permite acceder a los valores de los inputs.
  // Si el cambio ocurrió en el input de texto (identificado por idText), simplemente se retorna sin hacer nada, ya que ese cambio se maneja en handleTextChange.
  // Si el cambio ocurrió en alguno de los select (tecnología, ubicación o nivel de experiencia), se construye un objeto filters con los valores seleccionados y se llama a onSearch con esos filtros.
  const handleSubmit = (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    
    // Si el cambio ocurrió en el input de texto, no hacemos nada aquí porque ya lo manejamos en handleTextChange
    if (event.target.name === idText) {
      return // ya lo manejamos en onChange
    }

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text) // actualizamos el input inmediatamente

    // Debounce: Cancelar el timeout anterior
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      onTextFilter(text)
    }, 500)
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
}

export function SearchFormSection ({ onTextFilter, onSearch, initialText }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const inputRef = useRef()

  const {
    handleSubmit,
    handleTextChange
  } = useSearchForm({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter })

  const handleClearInput = (event) => {
    event.preventDefault()

    inputRef.current.value = ""
    onTextFilter("")
  }

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onChange={handleSubmit} id="empleos-search-form" role="search">

        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          
          <input
            ref={inputRef}
            name={idText} id="empleos-search-input" type="text"
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleTextChange}
            defaultValue={initialText}
          />

          <button onClick={handleClearInput}>
           ✖︎
          </button>
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology">
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select name={idLocation} id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name={idExperienceLevel} id="filter-experience-level">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

      <span id="filter-selected-value"></span>
    </section>
  )
}