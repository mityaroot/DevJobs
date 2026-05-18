import { useState } from 'react'

import './App.css'
import Header from '../components/Header.jsx'
import Main from '../components/Main.jsx'
import Footer from '../components/Footer.jsx'
import jobsData from '../data.json'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
