# Seguimiento del proyecto DevJobs

## Cambios realizados en busquedas.html y script.js

### Header responsivo
- Los elementos del header (`h1`, nav, Subir CV, icono usuario) bajan de línea cuando falta espacio (`flex-wrap: wrap`)
- Agrupados en contenedor izquierdo (DevJobs + Empleos) y derecho (Subir CV + icono) con `margin-left: auto`
- Cada grupo interno también tiene `flex-wrap: wrap` para que ningún elemento se aplaste

### Hero section
- Cambiado `height: 300px` → `min-height: 300px` para que el contenido no se desborde hacia arriba en pantallas pequeñas

### Artículos de empleos como tabla
- Quitados bordes individuales y border-radius de cada `<article>`
- Añadido `border-bottom` entre filas (excepto el último)
- El contenedor `.jobs-listing` tiene el borde exterior

### Filtros de búsqueda
- 4 filtros: tecnología, ubicación, tipo de contrato, nivel de experiencia
- Cada `<article>` tiene atributos `data-*` (data-technology, data-location, data-contract, data-experience)
- Función unificada `applyFilters()` que usa `Object.keys().every()` para aplicar todos los filtros activos con lógica AND
- Se ejecuta al cambiar cualquier `<select>`

### Botón Colorear
- Añadido icono SVG de pincel
- Estilo moderno con gradiente, bordes pill y glow
- Al activar, cada artículo recibe un gradiente lineal distinto (7 colores diferentes)

### Botón Aplicar / ¡Aplicado!
- Estilo moderno con gradiente índigo→púrpura (default) y esmeralda→verde (aplicado)
- Bordes pill, sombra sutil, efecto hover de elevación

### Nuevos empleos añadidos
- De 3 a 7 empleos con datos variados (frontend, backend, devops, data, ux-ui, mobile, fullstack)

### Archivos reestructurados
- Código movido de `01-html-css/` a `01-js/`
- README actualizado
