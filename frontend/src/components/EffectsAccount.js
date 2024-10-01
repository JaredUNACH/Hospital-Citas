import React, { useEffect } from 'react';

const EffectsAccount = () => {
  useEffect(() => {
    // Flecha para regresar a la página anterior
    const backButton = document.querySelector(".fecha-back");
    backButton.onclick = () => {
      window.history.back();
    };

    // Campana de notificación y menú de notificaciones
    const modal = document.querySelector('#notification-modal');
    const campana = document.querySelector('.campana');
    const notificationDot = document.querySelector('.notification-dot');
    const closeModal = document.querySelector('.modal .close');

    const showModal = (event) => {
      notificationDot.style.display = 'block';
      modal.style.display = 'block';
      event.stopPropagation();
    };

    const hideModal = (event) => {
      event.stopPropagation();
      modal.style.display = 'none';
    };

    const hideModalOnClickOutside = (event) => {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    };

    campana.addEventListener('click', showModal);
    closeModal.addEventListener('click', hideModal);
    window.addEventListener('click', hideModalOnClickOutside);

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

    toggle.onclick = toggleMenu;

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
      backButton.onclick = null;
      campana.removeEventListener('click', showModal);
      closeModal.removeEventListener('click', hideModal);
      window.removeEventListener('click', hideModalOnClickOutside);
      list.forEach((item) => item.removeEventListener("mouseover", activeLink));
      toggle.onclick = null;
      inputs.forEach((input) => {
        input.removeEventListener('input', actualizarLineaCarga);
      });
    };
  }, []);

  return null;
};

export default EffectsAccount;