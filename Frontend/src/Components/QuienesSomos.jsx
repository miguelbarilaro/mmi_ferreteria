import React from "react";
import "../CSS/QuienesSomos.css";

const QuienesSomos = () => {
  return (
    <>
      {/* ================= QUIÉNES SOMOS ================= */}
      <section className="quienes-section">
        <div className="containerTexto">
          <p className="texto">
            <span className="resaltado">MMI Industrial</span> es una empresa
            dedicada a la comercialización de productos de ferretería industrial
            en Tucumán y provincias limítrofes. Nos especializamos en ofrecer
            una amplia gama de productos de alta calidad, respaldados por marcas
            reconocidas en el mercado. En Ferretería Industrial Montenegro, nos
            enorgullecemos de nuestra filosofía empresarial, la cual se sustenta
            en cuatro pilares fundamentales: Seriedad, Responsabilidad,
            Compromiso y Honestidad. Estos valores nos guían en cada una de
            nuestras operaciones y nos permiten construir relaciones sólidas y
            duraderas con nuestros clientes.
          </p>
        </div>
      </section>

      {/* ================= CATÁLOGO ================= */}
      <section className="servicios-container p-4">
        <div className="titulo-container flex flex-col items-center justify-center mb-10 mt-10">
          <p className="titulo-naranja font-bold font-[Public-Sans]">
            <span className="titulo-naranja-gradiente">
              Nuestro Catálogo incluye:
            </span>
          </p>
        </div>

        <div className="servicios-row">
          <div className="slot">
            <div className="user-card">
              <span className="user-title">
                Accesorios galvanizados de 1/4 a 4"
              </span>
            </div>
          </div>

          <div className="slot">
            <div className="user-card">
              <span className="user-title">Accesorios de H° negro</span>
            </div>
          </div>

          <div className="slot">
            <div className="user-card">
              <span className="user-title">Accesorios serie 2000</span>
            </div>
          </div>

          <div className="slot">
            <div className="user-card">
              <span className="user-title">
                Elementos de seguridad personal
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuienesSomos;
