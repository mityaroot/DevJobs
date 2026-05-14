const jobsListingSection = document.querySelector('.job-listing')
const RESULTS_PER_PAGE = 3
let allCards = []
let currentPage = 1

const paginationNav = document.querySelector('.pagination')
const prevBtn = paginationNav.querySelector('a:first-child')
const nextBtn = paginationNav.querySelector('a:last-child')
const paginationContainer = document.getElementById('pagination-numbers')

fetch("./data.json")
    .then(response => response.json())
    .then(jobs => {
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
            allCards.push(article)
            jobsListingSection.appendChild(article)
        })

        renderPagination()
        goToPage(1)
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error)
    })

function goToPage(page) {
    const visibleCards = allCards.filter(card => !card.classList.contains('is-hidden'))
    const totalPages = Math.ceil(visibleCards.length / RESULTS_PER_PAGE) || 1

    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    currentPage = page

    allCards.forEach(card => card.style.display = '')

    const start = (page - 1) * RESULTS_PER_PAGE
    const end = Math.min(start + RESULTS_PER_PAGE, visibleCards.length)

    visibleCards.forEach((card, i) => {
        card.style.display = (i >= start && i < end) ? '' : 'none'
    })

    updateActivePage(page)
    updateNavButtons(page, totalPages)
}

function updateActivePage(page) {
    const pageLinks = paginationContainer.querySelectorAll('a')
    pageLinks.forEach((link, i) => {
        link.classList.toggle('is-active', i + 1 === page)
    })
}

function updateNavButtons(page, totalPages) {
    prevBtn.style.opacity = page <= 1 ? '0.4' : '1'
    prevBtn.style.pointerEvents = page <= 1 ? 'none' : 'auto'
    nextBtn.style.opacity = page >= totalPages ? '0.4' : '1'
    nextBtn.style.pointerEvents = page >= totalPages ? 'none' : 'auto'
}

function renderPagination() {
    paginationContainer.innerHTML = ''
    const visibleCards = allCards.filter(card => !card.classList.contains('is-hidden'))
    const totalPages = Math.ceil(visibleCards.length / RESULTS_PER_PAGE) || 1

    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement('a')
        a.href = '#'
        a.textContent = i
        a.addEventListener('click', (e) => {
            e.preventDefault()
            goToPage(i)
        })
        paginationContainer.appendChild(a)
    }

    paginationNav.style.display = visibleCards.length === 0 ? 'none' : 'flex'
}

prevBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (currentPage > 1) goToPage(currentPage - 1)
})

nextBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const visibleCards = allCards.filter(c => !c.classList.contains('is-hidden'))
    const totalPages = Math.ceil(visibleCards.length / RESULTS_PER_PAGE) || 1
    if (currentPage < totalPages) goToPage(currentPage + 1)
})

window.goToPage = goToPage
window.refreshPagination = () => {
    renderPagination()
    goToPage(1)
}
