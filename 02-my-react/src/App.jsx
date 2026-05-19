import { useState } from 'react'

import './App.css'
import Header from '../components/layout/HeaderD.jsx'
import Main from '../components/layout/MainD.jsx'
import Footer from '../components/layout/FooterD.jsx'
import jobsData from '../data.json'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Header />
      <Main />
      <Footer />
    </>
  )
}
