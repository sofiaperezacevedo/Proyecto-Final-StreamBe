import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CarritoProvider } from './CarritoContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarritoProvider>   {}
      <App />
    </CarritoProvider>
  </React.StrictMode>
);

reportWebVitals();
