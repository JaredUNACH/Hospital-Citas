import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home'; // Asegúrate de que el nombre del archivo sea 'Home.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} /> {/* Nueva ruta para Home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;