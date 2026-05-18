# Práctica: Migrar DevJobs de JavaScript Vanilla a React

Este documento contiene **enunciados paso a paso** para que migres el proyecto DevJobs de `01-js` (JavaScript puro) a `02-my-react` (React + Vite).

Cada ejercicio corresponde a una sección del curso en [`curso_react.md`](./curso_react.md). Léela primero si te atascas.

> `📂 01-js/` → código original que hay que migrar
> `📂 02-my-react/` → tu proyecto React donde escribirás el código

---

## Ejercicio 1 — Limpiar el template de Vite
**Curso:** [Instalación de Vite](./curso_react.md#instalacion-de-vite)

Vite ya está instalado en `02-my-react/`. Pero `App.jsx` tiene el template por defecto (contador, logos, etc.).

**Enunciado:**
1. Abre `src/App.jsx` y borra TODO su contenido (el template de ejemplo).
2. Limpia también `src/App.css` y `src/index.css` —deben quedar vacíos.
3. Copia el `style.css` de `01-js/` a `src/index.css` en `02-my-react/` (para mantener los mismos estilos).
4. Arranca el servidor con `npm run dev` y comprueba que se ve una página en blanco sin errores.

---

## Ejercicio 2 — Crear componente Header
**Curso:** [Componentes en React](./curso_react.md#componentes-en-react) · [Módulos JavaScript](./curso_react.md#modulos-javascript)

Mira el `<header>` de `01-js/index.html` (líneas 12-33).

**Enunciado:**
1. Crea el archivo `src/components/Header.jsx`.
2. Crea un componente `Header` que renderice el mismo contenido del header de `01-js/index.html`: el logo SVG, el texto "DevJobs" y el enlace de navegación.
3. Exporta el componente con `export function Header`.
4. En `App.jsx`, importa `Header` y renderízalo.

---

## Ejercicio 3 — Crear componente Hero
**Curso:** [JSX: La sintaxis de React](./curso_react.md#jsx-la-sintaxis-de-react)

Mira la sección `<section class="hero">` de `01-js/index.html` (líneas 37-58).

**Enunciado:**
1. Crea `src/components/Hero.jsx`.
2. Renderiza el título "Encuentra el trabajo de tus sueños", el párrafo y el formulario de búsqueda con su input y botón.
3. Importa y renderiza `Hero` en `App.jsx`.

---

## Ejercicio 4 — Crear componente Footer
**Curso:** [Componentes en React](./curso_react.md#componentes-en-react)

Mira el `<footer>` de `01-js/index.html` (líneas 116-118).

**Enunciado:**
1. Crea `src/components/Footer.jsx`.
2. Renderiza el footer con el texto de copyright.
3. Impórtalo en `App.jsx` y colócalo al final.

---

## Ejercicio 5 — Cargar datos desde data.json
**Curso:** [Migrando el Proyecto DevJobs a React](./curso_react.md#migrando-devjobs)

En `01-js/fetch-data.js` los datos se cargan con `fetch("./data.json")`. En React también puedes importar JSON directamente.

**Enunciado:**
1. En `App.jsx`, importa los datos: `import jobsData from './data.json'`.
2. Pásalos como prop `jobs` a un nuevo componente `JobListings` que crearás luego.
3. Comprueba en la consola que `jobsData` es un array.

---

## Ejercicio 6 — Crear componente JobCard
**Curso:** [Creando JobCard: Nuestro primer componente real](./curso_react.md#creando-jobcard-componente-real)

Mira cómo se crea cada tarjeta en `01-js/fetch-data.js` (líneas 14-35) y la estructura HTML que genera.

**Enunciado:**
1. Crea `src/components/JobCard.jsx`.
2. El componente debe recibir un objeto `job` como prop.
3. Renderiza:
   - Título (`job.titulo`)
   - Empresa y ubicación (`job.empresa` | `job.ubicacion`)
   - Descripción (`job.descripcion`)
   - Botón "Aplicar ahora" con clase `btn-apply-job`
4. Usa destructuring de props: `function JobCard({ job })`.

---

## Ejercicio 7 — Renderizar lista de JobCards con .map()
**Curso:** [Keys y Renderizado de Listas](./curso_react.md#keys-renderizado-de-listas)

**Enunciado:**
1. Crea `src/components/JobListings.jsx`.
2. Recibe `jobs` como prop (un array de empleos).
3. Renderiza un `<div className="job-listing">` que contenga un `<h2>` "Resultados de búsqueda".
4. Usa `jobs.map(job => <JobCard key={job.id} job={job} />)` para renderizar cada tarjeta.
5. Si `jobs` está vacío, muestra un mensaje "No se encontraron empleos".

---

## Ejercicio 8 — Botón "Aplicar" con useState
**Curso:** [Estado con useState](./curso_react.md#estado-con-usestate) · [Eventos en React](./curso_react.md#eventos-en-react)

Mira `01-js/apply-button.js` (líneas 7-16) donde se maneja el clic en "Aplicar".

**Enunciado:**
1. En `JobCard.jsx`, importa `useState` de React.
2. Añade estado: `const [isApplied, setIsApplied] = useState(false)`.
3. Crea un `handleApplyClick` que cambie el estado a `true`.
4. El botón debe mostrar "Aplicado" y tener clase `is-applied` cuando `isApplied` es `true`.
5. Cuando está aplicado, el botón debe estar deshabilitado (prop `disabled`).

---

## Ejercicio 9 — Extraer features section a componente
**Curso:** [Componentes vs Funciones normales](./curso_react.md#componentes-vs-funciones-normales)

Mira la sección "¿Por qué DevJobs?" en `01-js/index.html` (líneas 61-110). Son 3 artículos con iconos SVG.

**Enunciado:**
1. Crea `src/components/Features.jsx`.
2. Renderiza las 3 tarjetas de features (iconos SVG, título y descripción de cada una).
3. Impórtalo en `App.jsx` entre el Hero y el Footer.

---

## Ejercicio 10 — Separar componentes en archivos (módulos)
**Curso:** [Módulos JavaScript - Import y Export](./curso_react.md#modulos-javascript)

**Enunciado:**
1. Asegúrate de que cada componente esté en su propio archivo dentro de `src/components/`.
2. Usa `export function` (named exports) en todos.
3. En `App.jsx`, importa todos con `import { Componente } from './components/Componente.jsx'`.

---

## Ejercicio 11 — Props: pasar datos de padre a hijo
**Curso:** [Props - Comunicación entre Componentes](./curso_react.md#props-comunicacion)

**Enunciado:**
1. En `App.jsx`, crea un estado `const [jobs, setJobs] = useState(jobsData)` con los datos importados de `data.json`.
2. Pasa `jobs` como prop a `<JobListings jobs={jobs} />`.
3. En `JobListings`, recibe `jobs` y pásalo a cada `<JobCard job={job} />`.

---

## Ejercicio 12 — Pagination: props y valores por defecto
**Curso:** [Paginación - Props y Comunicación Padre-Hijo](./curso_react.md#paginacion-props)

Mira la paginación en `01-js/fetch-data.js` (líneas 79-96). Hay un nav con números de página.

**Enunciado:**
1. Crea `src/components/Pagination.jsx`.
2. Debe recibir props: `currentPage` (por defecto 1), `totalPages` (por defecto 1) y `onPageChange`.
3. Renderiza botones de "anterior", números de página y "siguiente".
4. El número de página actual debe resaltarse con clase `is-active`.
5. Los botones anterior/siguiente deben deshabilitarse en primera/última página.

---

## Ejercicio 13 — Callbacks: pasar funciones como props
**Curso:** [Callbacks - Pasar Funciones como Props](./curso_react.md#callbacks)

**Enunciado:**
1. En `Pagination.jsx`, al hacer clic en un número de página, llama a `onPageChange(page)`.
2. Al hacer clic en "anterior", llama a `onPageChange(currentPage - 1)`.
3. Al hacer clic en "siguiente", llama a `onPageChange(currentPage + 1)`.
4. Usa `event.preventDefault()` en los clics para evitar recarga.

---

## Ejercicio 14 — Lifting State Up: estado en el padre
**Curso:** [Estado por Props - Lifting State Up](./curso_react.md#lifting-state-up)

**Enunciado:**
1. En `App.jsx`, añade estado:
   ```jsx
   const [currentPage, setCurrentPage] = useState(1)
   const RESULTS_PER_PAGE = 4
   ```
2. Calcula:
   ```jsx
   const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)
   const start = (currentPage - 1) * RESULTS_PER_PAGE
   const end = start + RESULTS_PER_PAGE
   const visibleJobs = jobs.slice(start, end)
   ```
3. Pasa `visibleJobs` a `JobListings` en lugar de `jobs`.
4. Pasa `currentPage`, `totalPages` y `setCurrentPage` como `onPageChange` a `Pagination`.

---

## Ejercicio 15 — CSS: estilos globales y de componentes
**Curso:** [CSS Modules](./curso_react.md#css-modules)

Ya copiaste `style.css` a `index.css`. Ahora oriéntalo.

**Enunciado:**
1. Ajusta `src/index.css` para que tenga las variables CSS de `01-js/style.css` (las del `:root`).
2. Los estilos base (body, header, footer, form, button, etc.) ya están en `01-js/style.css`.
3. Crea `src/components/Pagination.module.css` con estilos específicos para la paginación (usa clases de CSS Modules).
4. En `Pagination.jsx`, importa los estilos: `import styles from './Pagination.module.css'`.
5. Aplica las clases con `styles.pagination`, `styles.isActive`, etc.

---

## Ejercicio 16 — useId para los filtros del formulario
**Curso:** [Hook useId()](./curso_react.md#hook-useid)

Mira el formulario de filtros en `01-js/busquedas.html` (líneas 82-143). Tiene selects para tecnología, ubicación y nivel.

**Enunciado:**
1. Crea `src/components/SearchForm.jsx`.
2. Usa `useId()` para generar IDs únicos para cada `<select>` y su `<label>` asociado.
3. Renderiza los 3 selects: tecnología, ubicación y nivel de experiencia.
4. Cada select debe tener un `<option value="">` por defecto y las opciones de `01-js/busquedas.html`.
5. Añade también un input de texto para búsqueda libre.

---

## Ejercicio 17 — Manejo de formularios con FormData
**Curso:** [Gestión de Formularios y Filtros](./curso_react.md#gestion-formularios-filtros)

Mira `01-js/filters.js` (líneas 40-86) donde se aplican los filtros.

**Enunciado:**
1. Crea un estado para los filtros en `App.jsx`:
   ```jsx
   const [filters, setFilters] = useState({ technology: '', location: '', level: '' })
   ```
2. En `SearchForm.jsx`, en el `onChange` del formulario, usa `new FormData(event.currentTarget)` para obtener los valores.
3. Llama a `onSearch(filters)` (una función que recibes por props) para pasar los filtros al padre.
4. En `App.jsx`, `handleSearch` debe actualizar `filters` y reiniciar a página 1.

---

## Ejercicio 18 — Filtrar empleos según los filtros
**Curso:** [Gestión de Formularios y Filtros](./curso_react.md#gestion-formularios-filtros)

Mira `01-js/filters.js` (líneas 61-80) para ver la lógica de filtrado.

**Enunciado:**
1. Crea una función `filterJobs` en `App.jsx` (o un `useMemo`) que filtre `jobsData` según `filters`.
2. La lógica:
   - Si `filters.technology` no está vacío, filtra por `job.data.technology`.
   - Si `filters.location` no está vacío, filtra por `job.data.modalidad`.
   - Si `filters.level` no está vacío, filtra por `job.data.nivel`.
   - Si hay texto de búsqueda, filtra por título/empresa/descripción.
3. Los `visibleJobs` deben calcularse sobre los datos ya filtrados.

---

## Ejercicio 19 — Botón de limpiar filtros
**Curso:** [Ejercicios: Formularios y Eventos](./curso_react.md#ejercicios-formularios-eventos)

Mira `01-js/filters.js` (líneas 97-108) donde hay un botón de "Limpiar filtros".

**Enunciado:**
1. Añade un botón "Limpiar filtros" en `SearchForm.jsx`.
2. Al hacer clic, debe resetear todos los filtros a valores vacíos.
3. Llama a `onReset()` (otra prop) para que el padre limpie los estados.

---

## Ejercicio 20 — Filtro por texto con debounce
**Curso:** [Técnica de debounce](./curso_react.md#tecnica-debounce) · [Hook useRef](./curso_react.md#hook-useref)

(Nota: este tema está en la sección de "Próximamente" del curso, pero es importante para la práctica.)

**Enunciado:**
1. Añade un estado `searchText` en `App.jsx` para el texto de búsqueda.
2. En `SearchForm.jsx`, el input de texto debe llamar a `onTextFilter(value)`.
3. Implementa **debounce**: en lugar de filtrar en cada tecla, espera 500ms después de que el usuario deje de escribir.
4. Usa `useRef` para guardar el `timeoutId` y poder cancelarlo.

---

## Resumen de archivos a crear/modificar

| Archivo | Acción |
|---|---|
| `src/App.jsx` | Limpiar y escribir lógica principal |
| `src/App.css` | Limpiar (o borrar) |
| `src/index.css` | Copiar desde `01-js/style.css` |
| `src/components/Header.jsx` | Crear |
| `src/components/Hero.jsx` | Crear |
| `src/components/Features.jsx` | Crear |
| `src/components/Footer.jsx` | Crear |
| `src/components/JobCard.jsx` | Crear |
| `src/components/JobListings.jsx` | Crear |
| `src/components/Pagination.jsx` | Crear |
| `src/components/Pagination.module.css` | Crear |
| `src/components/SearchForm.jsx` | Crear |

---

> 💡 **Tip:** Después de cada ejercicio, ejecuta `npm run dev` y comprueba que funciona antes de pasar al siguiente.
