# Fix de búsquedas — `TypeError: jobsData is undefined`

## Error

```
Uncaught TypeError: can't access property "filter", jobsData is undefined
    Hero HeroD.jsx:10
```

## Causas raíz

### 1. `jobsData` no se pasaba como prop

En `MainD.jsx` se renderizaba `<Hero />` sin props:

```jsx
<Hero />
```

Pero `HeroD.jsx` esperaba recibir `jobsData` y `setCurrentPage`:

```jsx
export default function Hero({ jobsData, setCurrentPage }) {
```

### 2. Temporal Dead Zone (TDZ) en `HeroD.jsx`

Las variables de estado se usaban antes de ser declaradas:

```jsx
const jobsFilteredByFilters = jobsData.filter(...)  // ← usa `filters` (línea 10)

const [filters, setFilters] = useState(...)          // ← declarado después (línea 18)
```

Lo mismo ocurría con `handleTextChange`, que usaba `setTextToFilter` y `textToFilter` antes de su `useState`.

### 3. Los filtros no afectaban los resultados visibles

El filtrado ocurría en `Hero`, pero la paginación en `MainD` usaba `JobData` sin filtrar. Cambiar filtros no tenía efecto en la lista de trabajos.

### 4. `JobFilterD` — bugs varios

| Bug | Código original | Problema |
|---|---|---|
| `event` vs `e` | `FormData(event.target)` | La función recibe `e` como parámetro, no `event` |
| `name` incorrectos | `<select name={technologySelect}>` | `formData.get(idTechnology)` buscaba un `name` distinto |
| Sin `<form>` | Los selects colgaban sin envoltura | No se podía enviar el formulario |
| Sin botón submit | Solo había "Limpiar filtros" | No se disparaba `onSearch` |

### 5. Mapeo de campos incorrecto

El JSON tiene `job.data.modalidad` y `job.data.nivel`, pero el código accedía a `job.data.location` y `job.data.experienceLevel`, que no existen.

```json
{
  "data": {
    "technology": "javascript",
    "modalidad": "remoto",    // ← esto es location
    "nivel": "senior"         // ← esto es experienceLevel
  }
}
```

## Solución aplicada

### Arquitectura: estado levantado a `MainD`

El estado de filtros y búsqueda por texto se movió de `HeroD` a `MainD`:

```
MainD (dueño del estado)
  ├── Hero        → recibe solo callbacks: onSearch, onTextChange
  │   ├── Search      → llama onTextChange al escribir/buscar
  │   └── JobFilter   → llama onSearch al enviar filtros
  ├── JobListing  → recibe currentJobs (ya filtrados y paginados)
  └── Pagination → recibe totalPages basado en resultados filtrados
```

### Archivos modificados

| Archivo | Cambio |
|---|---|
| `components/layout/MainD.jsx` | Agrega estado `filters` y `textToFilter`, computa `searchedJobs` y pagina sobre él. Pasa callbacks a `Hero`. |
| `components/hero/HeroD.jsx` | Elimina todo el estado interno. Recibe `onSearch` y `onTextChange` como props. |
| `components/hero/JobFilterD.jsx` | Envuelve en `<form>`, corrige `event` → `e`, usa `useId` como `name`, agrega botón submit. |
| `components/hero/SearchD.jsx` | Conecta `onChange`/`onSubmit` al `handleTextChange` recibido. |

### Flujo de datos corregido

1. Usuario selecciona filtros → `JobFilter` llama `onSearch(filters)` → `MainD` actualiza `filters` y resetea a página 1
2. Usuario escribe en búsqueda → `Search` llama `onTextChange(text)` → `MainD` actualiza `textToFilter` y resetea a página 1
3. `MainD` computa `searchedJobs = JobData.filter(tecnología).filter(ubicación).filter(nivel).filter(texto)`
4. `MainD` pagina `searchedJobs` → `currentJobs` y `totalPages`
5. `JobListing` recibe los resultados filtrados y paginados
