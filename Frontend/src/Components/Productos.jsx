import React, { useEffect, useState } from "react";
import "../CSS/Productos.css";

const API_URL = "http://localhost:5173/api/productos";


const campos = [
  "codigo","descripcion","info_adic","familia","fabricante","marca","iva","unidad",
  "concepto","cod_barra","lista","envase","cant_envase","origen","aduana","garantia",
  "serie","num_parte","control_stock","stock_min","stock_max","stock_seg",
  "punto_pedido","costo_reposicion","moneda_costo","peso_kg","fecha_act_costo",
  "nota","estado","url_foto","ubicacion","act_ing_bruto","imp_interno_ncm",
  "tipo_articulo","categoria_ml","variaciones","cod_regla_stock",
  "cod_proveedor","proveedor"
];

const emptyForm = campos.reduce((acc, c) => ({ ...acc, [c]: "" }), {});

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  /* ======================
     CARGAR PRODUCTOS
  ====================== */
  const cargarProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (mounted) setProductos(data);
      } catch (err) {
        console.error('Error cargando productos:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  /* ======================
     HANDLERS
  ====================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const formEl = e.target.form;
      const index = Array.from(formEl.elements).indexOf(e.target);
      formEl.elements[index + 1]?.focus();
    }
  };

  /* ======================
     GUARDAR / ACTUALIZAR
     🔴 CORRECCIÓN CLAVE
  ====================== */
  const guardar = async (e) => {
    e.preventDefault();

    // 🔧 LIMPIAR DATOS PARA MYSQL
    const limpio = Object.fromEntries(
      Object.entries(form).map(([k, v]) => {
        if (v === "") return [k, null];          // "" → NULL
        if (!isNaN(v)) return [k, Number(v)];   // números reales
        return [k, v];
      })
    );

    const method = editando ? "PUT" : "POST";
    const url = editando
      ? `${API_URL}/${idEditando}`
      : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(limpio),
    });

    setForm(emptyForm);
    setEditando(false);
    setIdEditando(null);
    cargarProductos();
  };

  /* ======================
     EDITAR
  ====================== */
  const editar = (producto) => {
    const { id_producto, ...resto } = producto;
    setForm(
      Object.fromEntries(
        campos.map(c => [c, resto[c] ?? ""])
      )
    );
    setEditando(true);
    setIdEditando(id_producto);
  };

  /* ======================
     ELIMINAR
  ====================== */
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarProductos();
  };

  return (
    <div className="productos-container">
      <h2>Gestión de Productos</h2>

      <form className="productos-form" onSubmit={guardar}>
        {campos.map((campo) => (
          <div className="form-group" key={campo}>
            <label>{campo}</label>
            <input
              name={campo}
              value={form[campo] ?? ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        ))}

        <button type="submit">
          {editando ? "Actualizar" : "Crear"}
        </button>
      </form>

      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {campos.map((c) => (
                <th key={c}>{c}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id_producto}>
                <td>{p.id_producto}</td>
                {campos.map((c) => (
                  <td key={c}>{p[c]}</td>
                ))}
                <td>
                  <button onClick={() => editar(p)}>✏️</button>
                  <button onClick={() => eliminar(p.id_producto)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
