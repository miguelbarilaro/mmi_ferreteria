import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Clientes.css";

const Clientes = () => {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_BASE = import.meta.env.DEV
    ? ""
    : import.meta.env.VITE_API_BASE || "http://localhost:8000";

  const emptyForm = {
    tipo_doc: "",
    nro_doc: "",
    tipo_responsable: "",
    codigo: "",
    razon_social: "",
    nombre_comercial: "",
    RG3685_cod_operaciones: "",
    domicilio: "",
    localidad: "",
    cod_postal: "",
    provincia: "",
    contacto: "",
    telefono: "",
    telefono_movil: "",
    cond_pago: "",
    descuento: "",
    lista: "",
    credito: "",
    transporte: "",
    dom_entrega: "",
    flete: "",
    pago_destino: "",
    vendedor: "",
    zona_geografica: "",
    nota: "",
    num_ing_bruto: "",
    convenio_multilateral: "",
    correo_electronico: "",
    fecha_alta: "",
  };

  const [form, setForm] = useState({ ...emptyForm });

  /* ================= ENTER COMO TAB ================= */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const elements = Array.from(
        e.target.form.querySelectorAll("input")
      ).filter((el) => !el.disabled);

      const index = elements.indexOf(e.target);
      if (index > -1 && index < elements.length - 1) {
        elements[index + 1].focus();
      }
    }
  };

  /* ================= FETCH ================= */
  const fetchClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/clientes`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al obtener clientes");
      const data = await res.json();
      setClientes(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE}/api/clientes/${editingId}`
        : `${API_BASE}/api/clientes`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error en la operación");

      await fetchClientes();
      setForm({ ...emptyForm });
      setEditingId(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (cliente) => {
    setEditingId(cliente.id_cliente || cliente.id);
    setForm({
      ...emptyForm,
      ...cliente,
      fecha_alta: cliente.fecha_alta
        ? cliente.fecha_alta.split("T")[0]
        : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar cliente?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/clientes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al eliminar cliente");
      await fetchClientes();
    } catch (e) {
      setError(e.message);
    }
  };

  const columns = ["id_cliente", ...Object.keys(emptyForm)];

  const headerLabel = (k) =>
    k === "id_cliente"
      ? "ID"
      : k.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  /* ================= RENDER ================= */
  return (
    <div className="clientes-page">
      {/* BOTÓN VOLVER */}
      <button className="btn-volver" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h2>Clientes</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            {Object.keys(emptyForm).map((field) => (
              <input
                key={field}
                name={field}
                type={field === "fecha_alta" ? "date" : "text"}
                placeholder={headerLabel(field)}
                value={form[field]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            ))}
          </div>

          {error && <div className="error">{error}</div>}

          <div>
            <button type="submit">
              {editingId ? "Actualizar" : "Crear"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ ...emptyForm });
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      {/* TABLA */}
      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{headerLabel(col)}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id_cliente || c.id}>
                  {columns.map((col) => (
                    <td key={col}>
                      {String(
                        col === "id_cliente"
                          ? c.id_cliente || c.id
                          : c[col] ?? ""
                      )}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(c)}>Editar</button>
                    <button onClick={() => handleDelete(c.id_cliente || c.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Clientes;
