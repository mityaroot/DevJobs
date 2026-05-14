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

const jobsListingSection = document.querySelector('.job-listing')

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
const levelFilter = document.querySelector('#experience-level');

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

// ####################################################################
// FETCH DE DATOS DESDE UN JSON LOCAL
console.log('antes de fetch')
fetch("./data.json") // el fetch es asíncrono, no bloquea el hilo principal, por eso el console.log de abajo se ejecuta antes de que el fetch termine
    .then((response) => {
        return response.json()
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const article = document.createElement('article')
            article.className = 'job-listing-card'
            article.dataset.modalidad = job.data.modalidad
            article.dataset.nivel = job.data.nivel
            article.dataset.technology = job.data.technology

            article.innerHTML = ` 
                <div class="job-card">
                    <h3>${job.titulo}</h3>
                    <small class="job-meta">${job.empresa} <span>|</span> <strong>Modalidad:</strong> ${job.data.modalidad}
                        <span>|</span> <strong>Nivel:</strong> ${job.data.nivel}
                        </small>
                    <p class="job-tech"><strong>Tecnología:</strong> <span>${job.data.technology}</span></p>
                    <p class="job-description">${job.descripcion}</p>
                    <hr>
                    <button class="btn-apply-job">Aplicar ahora</button>
                </div>
            `
            jobsListingSection.appendChild(article)
        })
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error)
    })

    console.log('después de fetch')