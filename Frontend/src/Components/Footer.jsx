import React from "react";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">

        <div className="footer-grid">

    
          <div>
            <h3 className="footer-title">MMI Industrial</h3>

            <p className="footer-text">
              Tu aliado confiable en herramientas y suministros industriales de alta calidad.
            </p>
          </div>

         
          <div>
            <h4 className="footer-subtitle orange">Contacto</h4>

            <p className="footer-item">📞 +5a 9 381 4264736</p>
            <p className="footer-item">📧 ferreteriamontenegro@outlook.com.ar</p>
            <p className="footer-item">📍 Av. Industrial 123, San Miguel de Tucumán</p>
          </div>

          <div>
            <h4 className="footer-subtitle beige">Horario</h4>

            <p className="footer-item">🕐 Lunes a Viernes: 9:00 - 18:00</p>
            <p className="footer-item">🕐 Sábados: 9:00 - 13:00</p>
            <p className="footer-item">🕐 Domingos: Cerrado</p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 MMI Industriales. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
