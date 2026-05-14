// ####################################################################
// Botón de "Limpiar filtros": resetea selects, buscador y muestra todos los artículos
/*
const btnLimpiar = document.getElementById('btn-reset-filters');
btnLimpiar.addEventListener('click', () => {
    for (const key in filters) {
        filters[key].selectedIndex = 0;
    }
    searchInput.value = '';

    applyFilters();
});
*/


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

// ------------
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

    jobs.forEach(job => {
        // Extraemos los datos de la tarjeta (article.dataset)
        const techData = job.dataset.technology || "";
        const locData = job.dataset.modalidad || ""; // En tu fetch pusiste .modalidad
        const levelData = job.dataset.nivel || "";    // En tu fetch pusiste .nivel

        // Lógica: La tarjeta se muestra si coincide con los 3 filtros a la vez
        const matchesTech = valTech === '' || techData.includes(valTech);
        const matchesLoc = valLoc === '' || locData === valLoc;
        const matchesLevel = valLevel === '' || levelData === valLevel;

        // Se muestra solo si cumple todas las condiciones
        const isShown = matchesTech && matchesLoc && matchesLevel;

        // Toggle de la clase 'is-hidden' según corresponda
        job.classList.toggle('is-hidden', !isShown);
    });
}

// 3. Escuchamos el evento 'change' en cada uno
techFilter.addEventListener('change', aplicarFiltros);
locationFilter.addEventListener('change', aplicarFiltros);
levelFilter.addEventListener('change', aplicarFiltros);