import chatgptImg from '@assets/chatgpt.png'
import perplexityImg from '@assets/perplexity.png'
import geminiImg from '@assets/gemini.png'

export default function Footer() {
  return (
    <footer style={{marginTop: '2rem', textAlign: 'center', color: '#777'}}>
        <p>&copy; 2024 DevJobs. Todos los derechos reservados.</p>
        
        <div className="ai-search-container">
          <p className="ai-search-title">Preguntar a la IA sobre Apolo</p>
          <div className="ai-buttons-flex">
            
            <a href="https://chatgpt.com/?q=¿Cuáles son las características principales de Apolo?" target="_blank" className="ai-btn" title="Preguntar a ChatGPT">
              <img src={chatgptImg} alt="ChatGPT" />
            </a>

            <a href="https://www.perplexity.ai/?q=Resume qué hace la plataforma Apolo y cuáles son sus beneficios" target="_blank" className="ai-btn" title="Preguntar a Perplexity">
              <img src={perplexityImg} alt="Perplexity" />
            </a>

            <a href="https://gemini.google.com/app?q=Analiza las ventajas de usar Apolo" target="_blank" className="ai-btn" title="Preguntar a Gemini">
              <img src={geminiImg} alt="Gemini" />
            </a>

          </div>
    </div>

    </footer>

  )   
}

