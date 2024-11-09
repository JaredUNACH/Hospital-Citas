import React from 'react';
import styled from 'styled-components';

const BotonEliminar = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="bin-button" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" className="bin-top">
          <line strokeWidth={2} stroke="red" y2={5} x2={39} y1={5} />
          <line strokeWidth={1.5} stroke="red" y2="1.5" x2="26.0357" y1="1.5" x1={12} />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" className="bin-bottom">
          <mask fill="white" id="path-1-inside-1_8_19">
            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
          </mask>
          <path mask="url(#path-1-inside-1_8_19)" fill="red" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" />
          <path strokeWidth={2} stroke="red" d="M12 6L12 29" />
          <path strokeWidth={2} stroke="red" d="M21 6V29" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" className="garbage">
          <path fill="red" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .bin-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    width: 20px; /* Reduce el tamaño del botón */
    height: 20px; /* Reduce el tamaño del botón */
  }
  .bin-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px; /* Reduce el tamaño del SVG */
    height: 5px; /* Reduce el tamaño del SVG */
  }
  .bin-bottom {
    position: absolute;
    top: 5px;
    left: 0;
    width: 20px; /* Reduce el tamaño del SVG */
    height: 20px; /* Reduce el tamaño del SVG */
  }
  .garbage {
    position: absolute;
    top: 10px;
    left: 0;
    width: 20px; /* Reduce el tamaño del SVG */
    height: 20px; /* Reduce el tamaño del SVG */
    opacity: 0;
    transition: all 0.3s;
  }
  .bin-button:hover .garbage {
    animation: throw 0.4s linear;
  }
  @keyframes throw {
    from {
      transform: translate(-400%, -700%);
      opacity: 0;
    }
    to {
      transform: translate(0%, 0%);
      opacity: 1;
    }
  }
`;

export default BotonEliminar;