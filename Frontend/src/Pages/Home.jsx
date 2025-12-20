import React from "react";
import Header from "../Components/Header";
import Carrousel from "../Components/Carrousel";
import Footer from "../Components/Footer";
import QuienesSomos from "../Components/QuienesSomos";
import ScrollToTop from "../Components/ScrollToTop";
import "../CSS/Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <Carrousel />
      <div className="home-split">
      <QuienesSomos />
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
