import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importando BrowserRouter, Routes e Route
import NovaPagina from './NovaPagina';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes> {/* Use Routes para envolver suas rotas */}
        <Route path="/" element={<App />} />
        <Route path="/nova-pagina" element={<NovaPagina />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
