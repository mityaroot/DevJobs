
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
const colores = ['rgba(255, 85, 227, 0.51)', 'rgba(0, 174, 255, 0.45)', 'rgba(0, 0, 255, 0.51)'];
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
            
