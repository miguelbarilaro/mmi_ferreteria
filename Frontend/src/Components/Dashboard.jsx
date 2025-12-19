import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Gestión</h1>

      <div className="dashboard-buttons">
        <button 
          className="dash-btn clientes"
          onClick={() => navigate("/clientes")}
        >
          Gestión de Clientes
        </button>

        <button 
          className="dash-btn productos"
          onClick={() => navigate("/productos")}
        >
          Gestión de Productos
        </button>

        <button 
          className="dash-btn ventas"
          onClick={() => navigate("/ventas")}
        >
          Ventas por Carrito
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
