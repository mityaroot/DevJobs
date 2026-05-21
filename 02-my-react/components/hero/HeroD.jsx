import JobFilterD from "./JobFilterD.jsx"
import Search from "./SearchD.jsx"
import heroImg from '@assets/hero.png'

export default function Hero({ onSearch, onTextChange }) {

    return (
        <section className="hero">
            <img src={heroImg} width="200" />

            <h1>Encuentra tú próximo trabajo</h1>

            <p>Explora miles de oportunidades en el sector tecnológico.</p>

            <Search handleTextChange={onTextChange} />

            <JobFilterD onSearch={onSearch} />

        </section>
    )
}
