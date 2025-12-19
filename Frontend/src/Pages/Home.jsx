import React from 'react'
import Header from '../Components/Header'
import Carrousel from '../Components/Carrousel'
import Footer from '../Components/Footer'
import QuienesSomos from '../Components/QuienesSomos'
import Catalogo from '../Components/Catalogo'
import Chatbot from '../Components/Chatbot'


const Home = () => {
  return (
    <div>
      <Header />
      <Carrousel />
      <QuienesSomos />
      <Catalogo />
      <Footer />
    </div>
  )
}

export default Home
