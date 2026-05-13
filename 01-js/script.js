
// ######################################################################
// Manejar clics en los botones de "Aplicar" dentro de la lista de empleos
// Usamos delegación de eventos: escuchamos clics en el contenedor .jobs-listing
const jobListings = document.querySelector('.jobs-listing');
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


// #####################################################################
// Botón de colorear: aplica gradientes de colores a los artículos de empleos
const btnColorear = document.getElementById('btn-colorear');
// Array de pares de colores para crear gradientes (uno por cada artículo)
const colores = [
    ['#6366f1', '#a855f7'],  // Índigo → Púrpura
    ['#14b8a6', '#06b6d4'],  // Verde azulado → Cian
    ['#f59e0b', '#ef4444'],  // Ámbar → Rojo
    ['#3b82f6', '#6366f1'],  // Azul → Índigo
    ['#ec4899', '#a855f7'],  // Rosa → Púrpura
    ['#10b981', '#14b8a6'],  // Esmeralda → Verde azulado
    ['#eab308', '#f59e0b'],  // Amarillo → Ámbar
];
const articulos = document.querySelectorAll('.jobs-listing article');
let coloreado = false; // Estado: true si los artículos están coloreados

btnColorear.addEventListener('click', () => {

    if (!coloreado) {
        // Aplicar gradientes a cada artículo
        articulos.forEach((art, i) => {
            const c = colores[i] || colores[0];
            art.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
            art.style.color = '#fff';
            art.style.borderBottomColor = 'transparent';
            art.querySelectorAll('p').forEach(p => p.style.color = '#fff');
            art.querySelectorAll('.btn-apply-job').forEach(b => b.style.color = '#fff');
        });
    } else {
        // Restaurar estilos originales quitando los inline
        articulos.forEach(art => {
            art.style.background = '';
            art.style.color = '';
            art.style.borderBottomColor = '';
            art.querySelectorAll('p').forEach(p => p.style.color = '');
            art.querySelectorAll('.btn-apply-job').forEach(b => b.style.color = '');
        });
    }
    coloreado = !coloreado; // Invertir el estado
});
            
// ####################################################################
// Custom select con estilo macOS glass
function buildCustomSelect(select) {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select-trigger';

    const valueSpan = document.createElement('span');
    valueSpan.className = 'custom-select-value placeholder';
    valueSpan.textContent = select.options[select.selectedIndex]?.textContent || 'Seleccionar';
    trigger.appendChild(valueSpan);

    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.setAttribute('width', '14');
    arrow.setAttribute('height', '14');
    arrow.setAttribute('viewBox', '0 0 24 24');
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('stroke', 'currentColor');
    arrow.setAttribute('stroke-width', '2');
    arrow.className = 'custom-select-arrow';
    arrow.innerHTML = '<path d="M6 9l6 6 6-6"/>';
    trigger.appendChild(arrow);

    const dropdown = document.createElement('div');
    dropdown.className = 'custom-select-dropdown';

    function buildOptions() {
        dropdown.innerHTML = '';
        Array.from(select.options).forEach((opt, idx) => {
            if (opt.tagName === 'OPTION') {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'custom-select-option';
                if (idx === select.selectedIndex) btn.classList.add('selected');
                btn.dataset.index = idx;
                btn.textContent = opt.textContent;
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    select.selectedIndex = idx;
                    updateTrigger();
                    closeAllDropdowns();
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                });
                dropdown.appendChild(btn);
            } else if (opt.tagName === 'OPTGROUP') {
                const label = document.createElement('div');
                label.className = 'custom-select-option optgroup-label';
                label.textContent = opt.label;
                dropdown.appendChild(label);
                Array.from(opt.children).forEach((childOpt, childIdx) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'custom-select-option';
                    const globalIdx = Array.from(select.options).indexOf(childOpt);
                    if (globalIdx === select.selectedIndex) btn.classList.add('selected');
                    btn.dataset.index = globalIdx;
                    btn.textContent = childOpt.textContent;
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        select.selectedIndex = globalIdx;
                        updateTrigger();
                        closeAllDropdowns();
                        select.dispatchEvent(new Event('change', { bubbles: true }));
                    });
                    dropdown.appendChild(btn);
                });
            }
        });
    }

    function updateTrigger() {
        const opt = select.options[select.selectedIndex];
        valueSpan.textContent = opt?.textContent || 'Seleccionar';
        if (select.selectedIndex === 0 || !select.value) {
            valueSpan.classList.add('placeholder');
        } else {
            valueSpan.classList.remove('placeholder');
        }
        dropdown.querySelectorAll('.custom-select-option').forEach(b => {
            b.classList.toggle('selected', parseInt(b.dataset.index) === select.selectedIndex);
        });
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
            dropdown.classList.add('open');
            trigger.classList.add('open');
            arrow.classList.add('open');
            buildOptions();
        }
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(dropdown);
    select.parentElement.insertBefore(wrapper, select);
    select.style.pointerEvents = 'none';

    updateTrigger();
    return wrapper;
}

function closeAllDropdowns() {
    document.querySelectorAll('.custom-select-dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.custom-select-trigger.open').forEach(t => t.classList.remove('open'));
    document.querySelectorAll('.custom-select-arrow.open').forEach(a => a.classList.remove('open'));
}

document.addEventListener('click', closeAllDropdowns);

// ####################################################################
// Filtros combinados de búsqueda de empleos (selects + búsqueda por texto)
// Mapeo de los elementos <select> del formulario de filtros
const filters = {
    technology: document.getElementById('filter-job-type'),
    location: document.getElementById('filter-location'),
    contract: document.getElementById('filter-contract-type'),
    experience: document.getElementById('filter-experience'),
};

// Construir custom selects
for (const key in filters) {
    buildCustomSelect(filters[key]);
}

// Input de búsqueda por texto libre
const searchInput = document.getElementById('empleos-search-input');

const filterLabels = {
    technology: 'Tecnología',
    location: 'Ubicación',
    contract: 'Tipo de contrato',
    experience: 'Nivel de experiencia',
};

const filterOptions = {
    technology: { frontend: 'Frontend', backend: 'Backend', devops: 'DevOps', data: 'Data', 'ux-ui': 'UX/UI', mobile: 'Mobile', fullstack: 'Full Stack', qa: 'QA', product: 'Producto', cloud: 'Cloud' },
    location: { remoto: 'Remoto', presencial: 'Presencial' },
    contract: { 'full-time': 'Tiempo completo', 'part-time': 'Medio tiempo', contract: 'Contrato' },
    experience: { junior: 'Junior', mid: 'Mid', senior: 'Senior' },
};

const terminal = document.getElementById('filter-terminal');
const terminalOutput = document.getElementById('terminal-output');

function updateTerminal(activeFilters, query, visibleCount, totalCount) {
    const hasActiveFilters = activeFilters.length > 0 || query;

    if (!hasActiveFilters) {
        terminal.style.display = 'none';
        return;
    }

    terminal.style.display = '';
    terminalOutput.innerHTML = activeFilters.map(f =>
        `<div class="terminal-filter-line">▸ <span class="filter-label-text">${f.label}:</span> <span class="filter-value-text">${f.value}</span></div>`
    ).join('') +
    (query ? `<div class="terminal-filter-line">▸ <span class="filter-label-text">Búsqueda:</span> <span class="filter-value-text">"${query}"</span></div>` : '') +
    `<div class="terminal-result-line">└─ resultados: <span class="terminal-result-count">${visibleCount}/${totalCount}</span></div>`;
}

// Función que aplica todos los filtros activos de forma combinada (AND)
function applyFilters() {
    // 1. Obtener los valores seleccionados en cada <select>
    const values = {};
    for (const key in filters) {
        values[key] = filters[key].value.toLowerCase();
    }

    // 2. Obtener el texto escrito en el buscador
    const query = searchInput.value.toLowerCase();

    // 3. Recorrer todos los artículos y decidir si mostrarlos u ocultarlos
    const articulos = document.querySelectorAll('.jobs-listing article');
    let visibleCount = 0;
    articulos.forEach(art => {
        // 3a. Verificar que el artículo cumpla TODOS los filtros activos
        //     .every() retorna true solo si todas las condiciones se cumplen
        const matchFilters = Object.keys(values).every(key => {
            // Si el filtro está vacío (sin seleccionar) se considera cumplido
            // Si tiene valor, se compara con el atributo data-* del artículo
            return !values[key] || art.dataset[key] === values[key];
        });

        // 3b. Verificar que el artículo coincida con el texto de búsqueda
        const matchSearch = !query || art.textContent.toLowerCase().includes(query);

        // 3c. Mostrar solo si cumple AMBAS condiciones (filtros Y búsqueda)
        const show = matchFilters && matchSearch;
        art.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });

    // 4. Actualizar terminal con filtros activos
    const activeFilters = [];
    for (const key in values) {
        if (values[key]) {
            const opts = filterOptions[key];
            activeFilters.push({
                label: filterLabels[key],
                value: opts?.[values[key]] || values[key],
            });
        }
    }
    updateTerminal(activeFilters, searchInput.value, visibleCount, articulos.length);
}

// Escuchar cambios en los selects de filtros
for (const key in filters) {
    filters[key].addEventListener('change', applyFilters);
}
// Escuchar escritura en el buscador (filtrado en tiempo real)
searchInput.addEventListener('input', applyFilters);


// ####################################################################
// Botón de "Limpiar filtros": resetea selects, buscador y muestra todos los artículos
const btnLimpiar = document.getElementById('btn-reset-filters');
btnLimpiar.addEventListener('click', () => {
    // 1. Resetear todos los selects a su valor por defecto (vacío) y el buscador
    for (const key in filters) {
        filters[key].selectedIndex = 0;
    }
    searchInput.value = '';

    // 2. Actualizar los triggers de los custom selects
    document.querySelectorAll('.custom-select').forEach((cs, i) => {
        const select = Object.values(filters)[i];
        if (!select) return;
        const valueSpan = cs.querySelector('.custom-select-value');
        const opt = select.options[select.selectedIndex];
        valueSpan.textContent = opt?.textContent || 'Seleccionar';
        valueSpan.classList.add('placeholder');
        cs.querySelectorAll('.custom-select-option').forEach(b => {
            b.classList.toggle('selected', parseInt(b.dataset.index) === select.selectedIndex);
        });
    });

    // 3. Aplicar filtros para refrescar la terminal
    applyFilters();
});