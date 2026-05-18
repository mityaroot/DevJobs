# Flujo del proyecto DevJobs

## Índice
1. [Visión general](#visión-general)
2. [Flujo de datos paso a paso](#flujo-de-datos-paso-a-paso)
3. [Router personalizado](#router-personalizado)
4. [Página Home](#página-home)
5. [Página Search](#página-search)
6. [Componentes secundarios](#componentes-secundarios)
7. [Resumen visual del flujo](#resumen-visual-del-flujo)

---

## Visión general

**DevJobs** es un SPA (*Single Page Application*) de búsqueda de empleo construido con **React 19** y **Vite 8**. Utiliza un **enrutador casero** en lugar de react-router-dom. Los datos de empleos se obtienen desde una API externa (`jscamp-api.vercel.app`).

El proyecto está estructurado así:

```
src/
├── main.jsx                  ← Punto de entrada
├── App.jsx                   ← Define rutas y layout global
├── hooks/
│   └── useRouter.jsx         ← Router personalizado
├── pages/
│   ├── Home.jsx              ← Página principal con buscador
│   ├── Search.jsx            ← Página con filtros y resultados
│   └── 404.jsx               ← Página de error
├── components/
│   ├── Header.jsx            ← Barra de navegación superior
│   ├── Footer.jsx            ← Pie de página
│   ├── Route.jsx             ← Componente condicional por ruta
│   ├── Link.jsx              ← Navegación sin recargar
│   ├── SearchFormSection.jsx ← Formulario de búsqueda con filtros
│   ├── JobListings.jsx       ← Lista de tarjetas de empleo
│   ├── JobCard.jsx           ← Tarjeta individual de empleo
│   └── Pagination.jsx        ← Paginación de resultados
└── data.json                 ← Datos locales de empleos (sin uso actual)
```

---

## Flujo de datos paso a paso

### 1. Entrada − `index.html` y `main.jsx`

```
index.html
  └── <div id="root"></div>
        └── <script src="/src/main.jsx">
              └── createRoot(document.getElementById('root'))
                    └── <App />
```

`main.jsx` toma el div vacío `#root` del HTML y monta la aplicación React dentro de él.

### 2. Layout global − `App.jsx`

```jsx
<>
  <Header />                  ← Siemvisible
  <Route path="/" component={HomePage} />
  <Route path="/search" component={SearchPage} />
  <Footer />                  ← Siempre visible
</>
```

`App.jsx` renderiza:
- **Header** y **Footer**: siempre visibles en todas las rutas.
- **Route**: dos instancias. Cada una pregunta al router: *"¿La ruta actual coincide con mi `path`?"*. Si sí, renderiza su `component`; si no, devuelve `null`.

### 3. El Router − `useRouter.jsx`

```jsx
function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handleLocationChange)
  }, [])

  function navigateTo(path) {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return { currentPath, navigateTo }
}
```

**¿Qué hace?**
- Escucha el evento `popstate` (disparado al navegar atrás/adelante).
- Expone `currentPath` (la ruta actual) y `navigateTo(path)` para cambiar de ruta sin recargar.
- Al llamar `navigateTo()`, se actualiza la URL con `pushState` y se dispara manualmente un evento `popstate` para que React se entere y re-renderice.

**¿Por qué es necesario disparar el evento manualmente?**
Porque `pushState` **no** dispara `popstate` por sí solo. Sin ese dispatch, el estado `currentPath` nunca se actualizaría al navegar con `Link`.

### 4. Navegación SPA − `Link.jsx`

```jsx
function Link({ href, children, ...restOfProps }) {
  const { navigateTo } = useRouter()

  const handleClick = (event) => {
    event.preventDefault()       // Evita la recarga completa
    navigateTo(href)             // Cambia la URL y avisa al router
  }

  return <a href={href} {...restOfProps} onClick={handleClick}>{children}</a>
}
```

Es un wrapper de `<a>` que intercepta el clic, previene la navegación tradicional y usa `navigateTo` para hacer la transición sin recargar la página.

### 5. Renderizado condicional − `Route.jsx`

```jsx
function Route({ path, component: Component }) {
  const { currentPath } = useRouter()
  if (currentPath !== path) return null
  return <Component />
}
```

Lógica simple: si el `currentPath` coincide con `path`, renderiza el componente. Si no, no renderiza nada.

### 6. Página Home − `HomePage`

```
Usuario escribe término → formulario → handleSearch()
                                         ↓
                                 navigateTo("/search?text=...")
                                         ↓
                              Se actualiza currentPath en useRouter
                                         ↓
                              Route cambia: se oculta Home, aparece SearchPage
```

El `HomePage`:
- Muestra un hero con imagen de fondo, título y formulario.
- Al enviar el formulario (`onSubmit`), construye una URL con el texto de búsqueda y navega a `/search?text=...`.
- Si el input está vacío, navega a `/search` sin query params.

### 7. Página Search − `SearchPage` (el corazón del proyecto)

Aquí ocurre la mayor parte de la lógica. El hook personalizado **`useFilters`** centraliza:

#### 7a. Estados iniciales desde la URL

```jsx
const [filters, setFilters] = useState(() => {
  const params = new URLSearchParams(window.location.search)
  return {
    technology: params.get('technology') || '',
    location: params.get('type') || '',
    experienceLevel: params.get('level') || ''
  }
})
const [textToFilter, setTextToFilter] = useState(() => {
  return new URLSearchParams(window.location.search).get('text') || ''
})
const [currentPage, setCurrentPage] = useState(() => {
  const page = Number(new URLSearchParams(window.location.search).get('page'))
  return Number.isNaN(page) ? page : 1
})
```

Al cargar la página (o al llegar desde Home), se leen los parámetros de la URL para inicializar los estados de filtros y página. Esto permite que la URL sea **compartible**: si alguien abre `/search?text=react&technology=react&page=2`, los filtros se restauran.

#### 7b. Fetch a la API (`useEffect`)

```jsx
useEffect(() => {
  async function fetchJobs() {
    setLoading(true)
    // Construye query params: text, technology, type, level, limit, offset
    const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
    const json = await response.json()
    setJobs(json.data)
    setTotal(json.total)
    setLoading(false)
  }
  fetchJobs()
}, [filters, currentPage, textToFilter])
```

Cada vez que cambian `filters`, `currentPage` o `textToFilter`, se dispara una petición a la API con los parámetros correspondientes. La API devuelve:
- `json.data`: array de empleos para la página actual.
- `json.total`: número total de empleos que coinciden (para calcular páginas).

#### 7c. Sincronizar URL con el estado (`useEffect`)

```jsx
useEffect(() => {
  // Construye query params con los mismos filtros
  const newUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname
  navigateTo(newUrl)
}, [filters, currentPage, textToFilter, navigateTo])
```

Cada vez que cambian los filtros, se actualiza la URL en la barra de direcciones (sin recargar) para reflejar el estado actual.

**Importante**: este efecto usa `navigateTo`, que actualiza `currentPath` en el router. Sin embargo, como la ruta base (`/search`) no cambia, no causa un re-renderizado de las rutas. Es solo para mantener la URL sincronizada.

#### 7d. Manejadores

```jsx
const handleSearch = (filters) => {
  setFilters(filters)
  setCurrentPage(1)     // Al cambiar filtros, volvemos a la página 1
}

const handleTextFilter = (newTextToFilter) => {
  setTextToFilter(newTextToFilter)
  setCurrentPage(1)     // También reinicia la paginación
}

const handlePageChange = (page) => {
  setCurrentPage(page)
}
```

### 8. Formulario de búsqueda − `SearchFormSection`

#### 8a. Hook interno `useSearchForm`

```jsx
const useSearchForm = ({ ... }) => {
  const [searchText, setSearchText] = useState("")
  const timeoutId = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Si quien disparó el evento es el input de texto, ignora (se maneja aparte)
    // Si es un <select>, construye filters y llama a onSearch(filters)
  }

  const handleTextChange = (event) => {
    setSearchText(event.target.value)              // actualiza el input al instante
    
    if (timeoutId.current) clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      onTextFilter(text)                           // llama a onTextFilter con 500ms de debounce
    }, 500)
  }
}
```

**Debounce**: la búsqueda por texto no se dispara en cada tecla, sino 500ms después de que el usuario deja de escribir. Esto evita hacer peticiones innecesarias a la API.

#### 8b. Separación de responsabilidades

| Input | Evento | Manejador | ¿Cuándo se ejecuta? |
|-------|--------|-----------|---------------------|
| Texto (`<input>`) | `onChange` | `handleTextChange` | Inmediato + debounce 500ms |
| Selects (`<select>`) | `onChange` del `<form>` | `handleSubmit` | Al cambiar cualquier select |

El formulario tiene `onChange={handleSubmit}` en el `<form>`. Cuando cambia cualquier `<select>`, se dispara el `onChange` del formulario. Cuando cambia el `<input>`, el `onChange` del input se ejecuta pero `handleSubmit` detecta que fue el input y lo ignora (hace `return`), dejando que `handleTextChange` lo maneje.

#### 8c. Botón de limpiar

```jsx
const handleClearInput = (event) => {
  event.preventDefault()
  inputRef.current.value = ""
  onTextFilter("")        // Reinicia el filtro de texto
}
```

### 9. Listado y tarjetas de empleo

```
SearchPage → JobListings → JobCard × N
```

**`JobListings`**: recibe `jobs` como prop, itera con `.map()` y renderiza un `JobCard` por cada empleo. Si `jobs` está vacío, muestra un mensaje de "no hay resultados".

**`JobCard`**: recibe un objeto `job` y renderiza título, empresa, ubicación, descripción y un botón "Aplicar". Usa `useState` para manejar el estado local de "aplicado":

```jsx
const [isApplied, setIsApplied] = useState(false)

const handleApplyClick = () => setIsApplied(true)
```

Al hacer clic en "Aplicar", cambia a "Aplicado" (verde y no clickeable).

### 10. Paginación

```
SearchPage → Pagination
```

```jsx
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  // ...
}
```

- Calcula un array de números de página.
- Botones "anterior" y "siguiente" se deshabilitan en la primera/última página.
- `buildPageUrl(page)` genera una URL absoluta con el nuevo `page` para que el enlace `<a href>` funcione aunque JavaScript falle.
- Al hacer clic en una página, `onPageChange(page)` actualiza el estado en `SearchPage`.

---

## Funciones principales del proyecto

| Función / Componente | Archivo | Rol |
|---|---|---|
| `createRoot().render()` | `main.jsx:5` | Monta React en el DOM |
| `App` | `App.jsx:8` | Layout: Header + Rutas + Footer |
| `useRouter` | `hooks/useRouter.jsx:3` | Gestiona `currentPath` y `navigateTo` |
| `Route` | `components/Route.jsx:3` | Renderiza condicional por ruta |
| `Link` | `components/Link.jsx:3` | Navegación SPA sin recarga |
| `HomePage` | `pages/Home.jsx:3` | Hero + formulario de búsqueda inicial |
| `SearchPage` | `pages/Search.jsx:114` | Página principal de resultados |
| `useFilters` | `pages/Search.jsx:10` | Hook que centraliza filtros, fetch y URL |
| `fetchJobs` | `pages/Search.jsx:36` | Petición a la API con filtros actuales |
| `useSearchForm` | `components/SearchFormSection.jsx:3` | Hook interno del formulario con debounce |
| `Pagination` | `components/Pagination.jsx:3` | Navegación entre páginas |
| `JobCard` | `components/JobCard.jsx:3` | Tarjeta individual de empleo |

---

## Resumen visual del flujo

```
                           index.html
                              │
                           main.jsx
                              │
                            App.jsx
                           ┌──┴──┐
                      ┌────┤ ROUTES ├────┐
                      │    └──┬──┘       │
                   Header   │    │      Footer
                            │    │
                      ┌─────┘    └─────┐
                      ▼                 ▼
                  HomePage          SearchPage
                  (/)               (/search)
                      │                 │
                      │           ┌─────┴──────┐
                      │           │  useFilters │
                      │           └─────┬──────┘
                      │                 │
              navega a /search?   ┌─────┴──────┐
                      │           │  useEffect  │──→ fetch API
                      │           │  (fetch)    │←── json.data
                      │           └─────┬──────┘
                      │                 │
                      │           ┌─────┴──────┐
                      │           │  useEffect  │──→ navigateTo() → URL
                      │           │  (sinc URL) │
                      │           └─────┬──────┘
                      │                 │
                      │           ┌─────┴──────────┐
                      │           │ SearchFormSection│
                      │           │ ┌─ useSearchForm─┐
                      │           │ │  handleSubmit  │──→ onSearch(filters)
                      │           │ │  handleTextChg │──→ onTextFilter(text)
                      │           │ └───────────────┘
                      │           └─────┬──────────┘
                      │                 │
                      │           ┌─────┴──────────┐
                      │           │   JobListings   │
                      │           │  ┌─ JobCard ─┐  │
                      │           │  │ "Aplicar" │  │
                      │           │  └───────────┘  │
                      │           └─────┬──────────┘
                      │                 │
                      │           ┌─────┴──────┐
                      │           │ Pagination  │
                      │           │ onPageChange│──→ setCurrentPage
                      │           └────────────┘
                      │
                 useRouter
              ┌──────────┴──────────┐
              │ currentPath (estado) │
              │ navigateTo (función) │
              │ pushState + popstate │
              └─────────────────────┘
```
