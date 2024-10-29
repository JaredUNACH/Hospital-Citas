import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EffectsAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Flecha para regresar a la página Home
    const backButton = document.querySelector(".fecha-back");
    if (backButton) {
      backButton.onclick = () => {
        navigate('/home');
      };
    }

    // Add hovered class to selected list item
    const list = document.querySelectorAll(".navigation li");

    const activeLink = function() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    };

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    const toggleMenu = () => {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };

    if (toggle) {
      toggle.onclick = toggleMenu;
    }

    // Selecciona todos los campos de entrada
    const inputs = document.querySelectorAll('.input input');
    const lineaCarga = document.querySelector('.linea-carga');

    const actualizarLineaCarga = () => {
      let camposCompletados = 0;
      const camposTotales = inputs.length;

      inputs.forEach((input) => {
        if (input.value !== '') {
          camposCompletados++;
        }
      });

      const porcentajeCompletado = (camposCompletados / camposTotales) * 100;
      lineaCarga.style.width = porcentajeCompletado + '%';
    };

    inputs.forEach((input) => {
      input.addEventListener('input', actualizarLineaCarga);
    });

    // Cleanup event listeners on component unmount
    return () => {
      if (backButton) {
        backButton.onclick = null;
      }
      list.forEach((item) => item.removeEventListener("mouseover", activeLink));
      if (toggle) {
        toggle.onclick = null;
      }
      inputs.forEach((input) => {
        input.removeEventListener('input', actualizarLineaCarga);
      });
    };
  }, [navigate]);

  return null;
};

export default EffectsAccount;