// ####################################################################
//  Midudev
/*
const filter = document.querySelector('#filter-technology')
// Elemento donde mostraremos el mensaje de la opción seleccionada
const mesage = document.querySelector('#filter-selected-value')

filter.addEventListener('change', function() {
    // Recuperamos todas las tarjetas de empleo para luego filtrarlas
    const jobs = document.querySelectorAll('.job-listing-card')

    const selectedValue = filter.value

    if (selectedValue) {
        mesage.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mesage.textContent = ''
    }

    jobs.forEach(job => {
        //const modalidad = job.dataset.modsalidad
        const modalidad = job.getAttribute('data-modalidad')
        const isShown = selectedValue === '' || selectedValue === modalidad
        job.classList.toggle('is-hidden', !isShown === false)

    })
})
*/

// ------------ MIO
// Input de búsqueda por texto libre
const searchInput = document.getElementById('empleos-search-input');

// 1. Seleccionamos todos los filtros
const techFilter = document.querySelector('#filter-technology');
const locationFilter = document.querySelector('#filter-location');
const levelFilter = document.querySelector('#filter-level');

// 2. Creamos una función que se ejecute cuando CUALQUIERA cambie
function aplicarFiltros() {
    const jobs = document.querySelectorAll('.job-listing-card');
    
    // Valores actuales de cada selector
    const valTech = techFilter.value;
    const valLoc = locationFilter.value;
    const valLevel = levelFilter.value;

    // Creamos un objeto con los valores de los filtros para facilitar la comparación
    const filters = {
        technology: valTech,
        modalidad: valLoc,
        nivel: valLevel,
    };
    
    // Obtener el texto escrito en el buscador
    const query = searchInput.value.toLowerCase();

    // Contador de resultados visibles
    let visibleCount = 0;

    jobs.forEach(job => {
        // Extraemos los datos de la tarjeta (article.dataset)
        const techData = job.dataset.technology || "";
        const locData = job.dataset.modalidad || ""; 
        const levelData = job.dataset.nivel || "";    

        // Lógica: La tarjeta se muestra si coincide con los 3 filtros a la vez
        const matchesTech = valTech === '' || techData.includes(valTech);
        const matchesLoc = valLoc === '' || locData === valLoc;
        const matchesLevel = valLevel === '' || levelData === valLevel;
        // para busqueda
        const matchSearch = !query || job.textContent.toLowerCase().includes(query);

        // Se muestra solo si cumple todas las condiciones
        const isShown = matchesTech && matchesLoc && matchesLevel && matchSearch;

        // Toggle de la clase 'is-hidden' según corresponda
        job.classList.toggle('is-hidden', !isShown);
        if (isShown) visibleCount++;
    });

    // Actualizamos la paginación después de aplicar los filtros
    if (typeof window.refreshPagination === 'function') {
        window.refreshPagination()
    }
}

// 3. Escuchamos el evento 'change' en cada uno
techFilter.addEventListener('change', aplicarFiltros);
locationFilter.addEventListener('change', aplicarFiltros);
levelFilter.addEventListener('change', aplicarFiltros);

searchInput.addEventListener('input', aplicarFiltros);

// ####################################################################
// Botón de "Limpiar filtros": resetea selects, buscador y muestra todos los artículos
const btnLimpiar = document.getElementById('btn-reset-filters');

btnLimpiar.addEventListener('click', () => {
    // 1. Reseteamos los valores de los elementos directamente
    techFilter.value = '';
    locationFilter.value = '';
    levelFilter.value = '';
    searchInput.value = '';

    // 2. Ejecutamos la lógica de filtrado para que las tarjetas reaparezcan
    aplicarFiltros();
});