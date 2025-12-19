import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Components/Dashboard";
import Clientes from "./Components/Clientes";
import Productos from "./Components/Productos";
import Ventas from "./Components/Ventas";
import { HOME, DASHBOARD, CLIENTES, PRODUCTOS, VENTAS } from "./Router/Router";

function App() {
  return (
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={DASHBOARD} element={<Dashboard />} />
        <Route path={CLIENTES} element={<Clientes />} />
        <Route path={PRODUCTOS} element={<Productos />} />
        <Route path={VENTAS} element={<Ventas />} />
      </Routes>
  );
}


export default App;
