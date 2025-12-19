import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD } from '../Router/Router';
import Cart from "./Cart";
import "../CSS/Header.css";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // prefer server-side session check (cookie + /me) but fallback to localStorage
    const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE || 'http://localhost:8000');
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: 'include' });
        if (res.ok) {
          setIsLogged(true);
          localStorage.setItem('logged', 'true');
          return;
        }
      } catch (e) {
        // ignore network errors and fallback to localStorage
      }

      const savedLogin = localStorage.getItem("logged");
      if (savedLogin === "true") setIsLogged(true);
    };

    check();

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem("logged", "true");
  };

  const handleOpenLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
    setUsername('');
    setPassword('');
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (username.trim() === '') return setErrorMsg('Ingresa un usuario');

    setLoading(true);
    // call backend auth endpoint; use relative path in dev so Vite proxy will apply
    const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE || 'http://localhost:8000');
    fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // receive HttpOnly cookie
      body: JSON.stringify({ email: username, password }),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data?.error || 'Error al autenticar');
        return;
      }
      // mark logged and redirect
      handleLogin();
      handleCloseLogin();
      navigate(DASHBOARD, { replace: true });
    }).catch((err) => {
      console.error('login fetch error', err);
      setErrorMsg('Error de red al autenticar');
    }).finally(() => setLoading(false));
  };

  // Manage focus and keyboard while modal is open
  useEffect(() => {
    if (!showLoginModal) return;

    // focus first input after modal opens
    const t = setTimeout(() => firstInputRef.current?.focus(), 50);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        handleCloseLogin();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [showLoginModal]);

  const handleModalKeyDown = (e) => {
    if (e.key !== 'Tab') return;
    const node = modalRef.current;
    if (!node) return;
    const focusable = node.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  };

  const handleLogout = () => {
    // call backend to clear cookie
    const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE || 'http://localhost:8000');
    fetch(`${API_BASE}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      setIsLogged(false);
      localStorage.removeItem("logged");
      // optionally redirect to home
      try { navigate('/', { replace: true }); } catch (e) {}
    });
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>MMI Industrial</h1>
        </div>

        <ul className="navbar-links">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#offers">Ofertas</a></li>
          <li><a href="#products">Productos</a></li>

          <li>
            <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
              🛒
              <span className="cart-badge">{cartItems.length}</span>
            </button>
          </li>

          <li>
            {!isLogged ? (
              <button className="login-btn" onClick={handleOpenLogin}>Ingresar</button>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
            )}
          </li>
        </ul>
      </nav>

      {cartOpen && <Cart items={cartItems} />}

      {/* MODAL LOGIN (rendered via portal so it's centered on the viewport) */}
      {showLoginModal && createPortal(
        <div className="modal-overlay" onClick={handleCloseLogin}>
          <div className="modal" ref={modalRef} onKeyDown={handleModalKeyDown} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
            <span className="close-btn" onClick={handleCloseLogin}>×</span>

            <h3>Iniciar sesión</h3>

            <form onSubmit={submitLogin}>
              <input 
                ref={firstInputRef}
                type="text" 
                placeholder="Usuario" 
                value={username} 
                onChange={(e)=>setUsername(e.target.value)} 
              />

              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
              />

              {errorMsg && <div className="login-error" role="alert" aria-live="assertive">{errorMsg}</div>}

              <div className="actions">
                <button type="button" className="btn cancel" onClick={handleCloseLogin} disabled={loading}>Cancelar</button>
                <button type="submit" className="btn submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
