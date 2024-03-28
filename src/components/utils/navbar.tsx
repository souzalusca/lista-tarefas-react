// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Importe seu arquivo de estilos CSS

const Navbar = () => {
  return (
    <nav className="navbar"> {/* Adicione uma classe ao elemento nav */}
      <ul className="navbar-list"> {/* Adicione uma classe ao elemento ul */}
        <li className="navbar-item"> {/* Adicione uma classe ao elemento li */}
          <Link to="/" className="navbar-link">Página Inicial</Link> {/* Adicione uma classe ao elemento Link */}
        </li>
        <li className="navbar-item"> {/* Adicione uma classe ao elemento li */}
          <Link to="/nova-pagina" className="navbar-link">Atualização</Link> {/* Adicione uma classe ao elemento Link */}
        </li>
        <li className="navbar-item"> {/* Adicione uma classe ao elemento li */}
          <Link to="/nova-pagina" className="navbar-link">Remoção</Link> {/* Adicione uma classe ao elemento Link */}
        </li>
        <li className="navbar-item"> {/* Adicione uma classe ao elemento li */}
          <Link to="/nova-pagina" className="navbar-link">Nova Página</Link> {/* Adicione uma classe ao elemento Link */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

