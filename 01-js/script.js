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

    const articulos = document.querySelectorAll('.jobs-listings article');
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
// BOTON DE APLICAR A EMPLEO

const jobsListingSection = document.querySelector('.jobs-listings')

// Delegación de eventos: escuchamos clics en el contenedor de las ofertas de empleo
jobsListingSection.addEventListener('click', function(event) {
  const element = event.target

  // Si el elemento clickeado es un botón de aplicar a empleo, cambiamos su estado
  if (element.classList.contains('btn-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

// ####################################################################
// Filtro de ubicación
const filter = document.querySelector('#filter-location')
// Elemento donde mostraremos el mensaje de la opción seleccionada
const mesage = document.querySelector('#filter-selected-value')
// Recuperamos todas las tarjetas de empleo para luego filtrarlas
const jobs = document.querySelectorAll('.jobs-listings-card')

filter.addEventListener('change', function() {
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


console.log('antes de fetch')
fetch("./data.json") // el fetch es asíncrono, no bloquea el hilo principal, por eso el console.log de abajo se ejecuta antes de que el fetch termine
    .then((response) => {
        return response.json()
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const article = document.createElement('article')
            article.classList.add('jobs-listings-card')
            article.innerHTML = `
                <h3>${job.titulo}</h3>
                <p>${job.empresa}</p>
                <p>${job.ubicacion}</p>
                <p>${job.descripcion}</p>
                <button class="btn-apply-job">Aplicar</button>
            `
            jobsListingSection.appendChild(article)
        })
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error)
    })

    console.log('después de fetch')