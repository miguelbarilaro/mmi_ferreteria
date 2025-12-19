import React from "react";
import "../CSS/Catalogo.css";

const Catalogo = () => {
  return (
    <div className="servicios-container p-4">
      <div className="titulo-container flex flex-col items-center justify-center mb-10 mt-10">
        <p className="titulo-naranja font-bold font-[Public-Sans]"> <span className="titulo-naranja-gradiente">Nuestro Catalogo incluye:</span>
        </p>
      </div>

      {/* Contenedor en fila */}
      <div className="servicios-row">
        <div className="slot" data-swapy-slot="1">
          <div className="user-card" data-swapy-item="1">
            <span className="user-title">Accesorios galbanizados de 1/4 a 4"</span>
          </div>
        </div>

        <div className="slot" data-swapy-slot="2">
          <div className="user-card" data-swapy-item="2">
            <span className="user-title">Accesorios de H* negro</span>
          </div>
        </div>

        <div className="slot" data-swapy-slot="3">
          <div className="user-card" data-swapy-item="3">
            <span className="user-title">Accesorios serie 2000</span>
          </div>
        </div>

        <div className="slot" data-swapy-slot="4">
          <div className="user-card" data-swapy-item="4">
            <span className="user-title">Elementos de seguridad personal</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Catalogo;
