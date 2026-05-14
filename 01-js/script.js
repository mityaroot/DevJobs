// ####################################################################
// Filtros combinados de búsqueda de empleos (selects + búsqueda por texto)
// Mapeo de los elementos <select> del formulario de filtros
/*
const filters = {
    technology: document.getElementById('filter-job-type'),
    location: document.getElementById('filter-location'),
    contract: document.getElementById('filter-contract-type'),
    experience: document.getElementById('filter-experience'),
};

// Input de búsqueda por texto libre
const searchInput = document.getElementById('empleos-search-input');

// Función que aplica todos los filtros activos de forma combinada (AND)
function applyFilters() {
    const values = {};
    for (const key in filters) {
        values[key] = filters[key].value.toLowerCase();
    }

    const query = searchInput.value.toLowerCase();

    const articulos = document.querySelectorAll('.job-listing article');
    let visibleCount = 0;
    articulos.forEach(art => {
        const matchFilters = Object.keys(values).every(key => {
            return !values[key] || art.dataset[key] === values[key];
        });

        const matchSearch = !query || art.textContent.toLowerCase().includes(query);

        const show = matchFilters && matchSearch;
        art.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });

}

// Escuchar cambios en los selects de filtros
for (const key in filters) {
    filters[key].addEventListener('change', applyFilters);
}
// Escuchar escritura en el buscador (filtrado en tiempo real)
searchInput.addEventListener('input', applyFilters);

*/


