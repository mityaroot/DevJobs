
import JobFilterD from "./JobFilterD.jsx"
import Search from "./SearchD.jsx"
import heroImg from '@assets/hero.png'

function Hero() {
    return (
        <section className="hero">
            <img src={heroImg} width="200" />

            <h1>Encuentra tú próximo trabajo</h1>

            <p>Explora miles de oportunidades en el sector tecnológico.</p>
        
            <Search/>

            <JobFilterD/>

        </section>

    )
}

export default Hero