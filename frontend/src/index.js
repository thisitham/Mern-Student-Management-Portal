import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


//app.js eke thiyna export karapu function me render() athule denawa
//so meka root widihata index.html file ekata yanawa
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


//reportWebVitals();
