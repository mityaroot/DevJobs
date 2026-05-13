
/*
const empleo1 = document.getElementById('empleo-1');
const empleo2 = document.getElementById('empleo-2');   
const empleo3 = document.getElementById('empleo-3');

// ###################################################################### 
// Agregar funcionalidad a los botones de aplicar
const parrafos = [...empleo1.querySelectorAll('p'), ...empleo2.querySelectorAll('p'), ...empleo3.querySelectorAll('p')];
const botones = document.querySelectorAll('.btn-apply-job');

botones.forEach(b => {
    b.addEventListener('click', () => {
        b.classList.toggle('is-applied');
        console.log(`Botón ${b.id} clickeado. Clase 'is-applied' ahora: ${b.classList.contains('is-applied')}`);
        b.textContent = b.classList.contains('is-applied') ? '¡Aplicado!' : 'Aplicar';

        console.log('Estado actual de los botones:');
        botones.forEach(btn => console.log(btn.id, btn.classList.contains('is-applied')));
        //b.classList.contains('is-applied') ? console.log(`Botón ${b.id} marcado como aplicado`) : console.log(`Botón ${b.id} desmarcado como aplicado`);
        
    });
});
*/

// Selección de elementos del DOM
const jobListings = document.querySelector('.jobs-listing');
jobListings?.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('btn-apply-job')) {
        target.classList.toggle('is-applied');

        console.log(`Botón ${target.id} clickeado. Clase 'is-applied' ahora: ${target.classList.contains('is-applied')}`);
        
        target.textContent = target.classList.contains('is-applied') ? '¡Aplicado!' : 'Aplicar';
        
        console.log('Estado actual de los botones:');
        
        const botones = document.querySelectorAll('.btn-apply-job');
        
        botones.forEach(btn => console.log(btn.id, btn.classList.contains('is-applied')));
    }
});


// #####################################################################
// Agregar funcionalidad al botón de colorear
const btnColorear = document.getElementById('btn-colorear');
const colores = ['rgba(255, 36, 218, 0.29)', 'rgba(255, 0, 221, 0.45)', 'rgba(0, 102, 255, 0.25)'];
const articulos = document.querySelectorAll('.jobs-listing article');
let coloreado = false;

btnColorear.addEventListener('click', () => {

    if (!coloreado) {
        articulos.forEach((art, color) => {
            art.style.backgroundColor = colores[color] || colores[0];
            art.style.color = '#fff';
            art.querySelectorAll('p').forEach(p => p.style.color = '#fff');
            art.querySelectorAll('.btn-apply-job').forEach(b => b.style.color = '#fff');
        });
    } else {
        articulos.forEach(art => {
            art.style.backgroundColor = '';
            art.style.color = '';
            art.querySelectorAll('p').forEach(p => p.style.color = '');
            art.querySelectorAll('.btn-apply-job').forEach(b => {
                b.style.color = '';
                //b.classList.remove('is-applied');
                //b.textContent = 'Aplicar';
            });
        });
    }
    coloreado = !coloreado;
});
            
// ####################################################################
// Filtros combinados de búsqueda de empleos
const filters = {
    technology: document.getElementById('filter-job-type'),
    location: document.getElementById('filter-location'),
    contract: document.getElementById('filter-contract-type'),
    experience: document.getElementById('filter-experience'),
};

function applyFilters() {
    const values = {};
    for (const key in filters) {
        values[key] = filters[key].value.toLowerCase();
    }

    const articulos = document.querySelectorAll('.jobs-listing article');
    articulos.forEach(art => {
        const show = Object.keys(values).every(key => {
            return !values[key] || art.dataset[key] === values[key];
        });
        art.style.display = show ? '' : 'none';
    });
}

for (const key in filters) {
    filters[key].addEventListener('change', applyFilters);
}