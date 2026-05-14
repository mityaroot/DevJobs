// FETCH DE DATOS DESDE UN JSON LOCAL
const jobsListingSection = document.querySelector('.job-listing')

const RESULTS_PER_PAGE = 3
let currentPage = 1
const job_article = 0;

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
            job_article++;
            jobsListingSection.appendChild(article)
            
            if (job_article < RESULTS_PER_PAGE) {
                const paginationNumbers = document.getElementById('pagination-numbers');
                const pageNumber = document.createElement('a');
                pageNumber.href = '#' + job_article;
                pageNumber.textContent = currentPage++;
                paginationNumbers.appendChild(pageNumber);
            }
        })
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error)
    })

    console.log('después de fetch')