
// Manejar clics en los botones de "Aplicar" dentro de la lista de empleos
// Usamos delegación de eventos: escuchamos clics en el contenedor .jobs-listings

/*
const jobListings = document.querySelector('.jobs-listings');
jobListings?.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('btn-apply-job')) {
        // Alternar la clase 'is-applied' para cambiar el estilo visual
        target.classList.toggle('is-applied');

        console.log(`Botón ${target.id} clickeado. Clase 'is-applied' ahora: ${target.classList.contains('is-applied')}`);
        
        // Cambiar el texto del botón según si está aplicado o no
        target.textContent = target.classList.contains('is-applied') ? '¡Aplicado!' : 'Aplicar';
        
        console.log('Estado actual de los botones:');
        
        const botones = document.querySelectorAll('.btn-apply-job');
        
        botones.forEach(btn => console.log(btn.id, btn.classList.contains('is-applied')));
    }
});
*/

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

const jobsListingSection = document.querySelector('.jobs-listings')

jobsListingSection.addEventListener('click', function(event) {
  const element = event.target

  if (element.classList.contains('btn-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

const filter = document.querySelector('#filter-location')
const mesage = document.querySelector('#filter-selected-value')
const jobs = document.querySelectorAll('.jobs-listings-card')

filter.addEventListener('change', function() {
  const selectedValue = filter.value

    if (selectedValue) {
        mesage.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mesage.textContent = 'No has seleccionado ninguna ubicación'
    }



// - Comentarios con otros eventos interesantes

// otras formas de añadir eventos click a elementos
// recupera solo el primer boton que encuentre
// const boton = document.querySelector('.btn-apply-job')
// console.log(boton) // null si no lo encuentra

// if (boton !== null) {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// }

// const botones = document.querySelectorAll('.btn-apply-job')
// // devuelve un NodeList (array-like) con todos los botones que encuentre
// // o una lista vacia [] si no encuentra ninguno

// botones.forEach(boton => {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// })

// ejemplos de eventos
// const searchInput = document.querySelector('#empleos-search-input')

// searchInput.addEventListener('input', function() {
//   console.log(searchInput.value)
// })

// searchInput.addEventListener('blur', function() {
//   console.log('Se dispara cuando el campo pierde el foco')
// })

// const searchForm = document.querySelector('#empleos-search-form')

// searchForm.addEventListener('submit', function(event) {
//   event.preventDefault()
//   // ... todo lo que yo te diga aqui
//   console.log('submit')
// })

// document.addEventListener('keydown', function(event) {
//   console.log("Tecla presionada: ", event.key)
//   console.log("¿Está pulsada la tecla shift?", event.shiftKey)
//   console.log("¿Está pulsada la tecla ctrl?", event.ctrlKey)
//   console.log("¿Está pulsada la tecla alt?", event.altKey)
// })