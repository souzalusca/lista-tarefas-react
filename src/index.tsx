import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateLogin from './components/CreateLogin';
import Login from './components/Login';
import { ThemeProvider } from 'styled-components';
import lightTheme from './styles/themes/light';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<App toggleTheme={() => {}} />} // Adicionando toggleTheme como propriedade
          />
          <Route path="/create-login" element={<CreateLogin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
