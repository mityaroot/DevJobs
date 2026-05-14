# Paginación funcional en DevJobs

## Problema original

La paginación en `fetch-data.js` tenía varios errores:

1. **`const job_article = 0;`** con `job_article++` — error de JavaScript (no se puede reasignar una constante).
2. **Condición al revés**: `if (job_article < RESULTS_PER_PAGE)` — solo creaba números de página para los primeros 3 trabajos en lugar de calcular las páginas totales.
3. **Sin cambio de página**: los números de página y flechas tenían `href="#"` pero ningún manejador de eventos para cambiar de página.
4. **Sin estado activo**: nunca se aplicaba la clase `.is-active` al número de página actual.
5. **Sin integración con filtros**: los filtros en `filters.js` y la paginación eran independientes; al filtrar no se reiniciaba la paginación.

## Solución implementada

### `fetch-data.js` — Nuevo sistema de paginación

```javascript
const RESULTS_PER_PAGE = 3
let allCards = []       // Almacena todas las tarjetas creadas
let currentPage = 1     // Página actual
```

- `allCards[]` guarda referencias a todos los `<article>` creados para poder mostrar/ocultar sin tener que consultar el DOM cada vez.

#### `renderPagination()`

Se encarga de dibujar los números de página en el `<div id="pagination-numbers">`:

1. Cuenta las tarjetas **no ocultas por filtros** (sin la clase `.is-hidden`).
2. Calcula el total de páginas: `Math.ceil(visibleCards.length / RESULTS_PER_PAGE)`.
3. Crea un `<a>` por cada página con su evento `click` que llama a `goToPage(i)`.
4. Si no hay resultados visibles, oculta la navegación completa.

#### `goToPage(page)`

Muestra solo las tarjetas que corresponden a la página indicada:

```
Página 1 → tarjetas [0, 1, 2]
Página 2 → tarjetas [3, 4, 5]
Página 3 → tarjetas [6, 7, 8]
...etc
```

1. Filtra las tarjetas visibles (las que no tienen `.is-hidden`).
2. Resuelve los límites: `start = (page - 1) * 3`, `end = start + 3`.
3. Aplica `display: none` a las tarjetas fuera del rango.
4. Actualiza la clase `.is-active` en el número de página.
5. Actualiza el estado visual de las flechas anterior/siguiente.

#### Navegación

Las flechas `<` y `>` tienen event listeners que:
- **Anterior**: `goToPage(currentPage - 1)` si no estamos en la página 1.
- **Siguiente**: `goToPage(currentPage + 1)` si no estamos en la última página.

Visualmente se atenúan (opacity 0.4 + pointer-events none) cuando están deshabilitadas.

#### Funciones globales expuestas

```javascript
window.goToPage = goToPage
window.refreshPagination = () => {
    renderPagination()
    goToPage(1)
}
```

- `window.refreshPagination()` es llamada desde `filters.js` cada vez que se aplican filtros, recalculando las páginas y volviendo a la página 1.

---

### `filters.js` — Integración con paginación

Se añadió al final de `aplicarFiltros()`:

```javascript
if (typeof window.refreshPagination === 'function') {
    window.refreshPagination()
}
```

Esto asegura que cada vez que el usuario cambia un filtro (tecnología, ubicación, nivel, búsqueda por texto, o limpia filtros):
1. Se aplican los filtros (toggle `.is-hidden`).
2. Se recalcula el número de páginas.
3. Se vuelve a la página 1.

---

### Flujo completo de interacción

```
1. Carga de página
   │
   ├── fetch("./data.json") → se crean 15 tarjetas
   ├── renderPagination() → se crean 5 páginas (15/3 = 5)
   └── goToPage(1) → se muestran las 3 primeras tarjetas

2. Usuario hace clic en "Página 3"
   │
   └── goToPage(3) → se ocultan todas, se muestran tarjetas [6, 7, 8]

3. Usuario selecciona filtro "React"
   │
   ├── aplicarFiltros() → .is-hidden en tarjetas que no coinciden
   └── refreshPagination()
       ├── renderPagination() → se crean N páginas (ej: 2 páginas de React)
       └── goToPage(1) → se muestran los primeros resultados filtrados

4. Usuario hace clic en "Limpiar filtros"
   │
   ├── se resetean selects e input
   ├── aplicarFiltros() → se quita .is-hidden de todas
   └── refreshPagination()
       ├── renderPagination() → 5 páginas otra vez
       └── goToPage(1)
```

---

### CSS relevante

- `.pagination` — flexbox centrado con gap de 0.5rem.
- `.pagination a.is-active` — fondo azul (`--primary-light`) y texto blanco, sin `pointer-events` para evitar doble clic.
- `.pagination a:hover` — fondo blanco.
- `.pagination a:active` — escala 0.90 (efecto de pulsación).

---

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `01-js/fetch-data.js` | Reescribir lógica de paginación: goToPage, renderPagination, updateActivePage, updateNavButtons |
| `01-js/filters.js` | Añadir llamada a `window.refreshPagination()` al final de `aplicarFiltros()` |
