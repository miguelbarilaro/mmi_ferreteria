import React, { useEffect, useState } from "react";
import "../CSS/Carrousel.css";

const images = [
  new URL("../assets/1.png", import.meta.url).href,
  new URL("../assets/2.png", import.meta.url).href,
  new URL("../assets/3.png", import.meta.url).href,
  new URL("../assets/4.png", import.meta.url).href,
  new URL("../assets/5.png", import.meta.url).href,
  new URL("../assets/6.png", import.meta.url).href,
  new URL("../assets/7.png", import.meta.url).href,
  new URL("../assets/8.png", import.meta.url).href,
  new URL("../assets/9.jpeg", import.meta.url).href,
  new URL("../assets/10.jpeg", import.meta.url).href,
  new URL("../assets/11.jpeg", import.meta.url).href,
  new URL("../assets/12.png", import.meta.url).href,
  new URL("../assets/13.jpg", import.meta.url).href,
];

const Carrousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []); // <- cerrar useEffect con el array de dependencias

  return (
    <section className="carousel-section">
         <h1>Marcas con las que trabajabamos:</h1>
      <div className="carousel-container">
        {images.map((src, i) => (
          <div key={i} className={`carousel-slide ${i === index ? "active" : ""}`}>
            <img src={src} alt={`logo-${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
}; // <- cerrar la función Carrousel

export default Carrousel;