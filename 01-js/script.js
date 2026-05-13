
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
const colores = [
    ['#6366f1', '#a855f7'],
    ['#14b8a6', '#06b6d4'],
    ['#f59e0b', '#ef4444'],
    ['#3b82f6', '#6366f1'],
    ['#ec4899', '#a855f7'],
    ['#10b981', '#14b8a6'],
    ['#eab308', '#f59e0b'],
];
const articulos = document.querySelectorAll('.jobs-listing article');
let coloreado = false;

btnColorear.addEventListener('click', () => {

    if (!coloreado) {
        articulos.forEach((art, i) => {
            const c = colores[i] || colores[0];
            art.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
            art.style.color = '#fff';
            art.style.borderBottomColor = 'transparent';
            art.querySelectorAll('p').forEach(p => p.style.color = '#fff');
            art.querySelectorAll('.btn-apply-job').forEach(b => b.style.color = '#fff');
        });
    } else {
        articulos.forEach(art => {
            art.style.background = '';
            art.style.color = '';
            art.style.borderBottomColor = '';
            art.querySelectorAll('p').forEach(p => p.style.color = '');
            art.querySelectorAll('.btn-apply-job').forEach(b => b.style.color = '');
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