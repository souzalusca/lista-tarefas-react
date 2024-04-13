import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importando BrowserRouter, Routes e Route
import CreateLogin from './components/CreateLogin';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes> {/* Use Routes para envolver suas rotas */}
        <Route path="/" element={<App />} />
        <Route path="/create-login" element={<CreateLogin />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
