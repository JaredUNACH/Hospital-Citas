import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const arrowBounce = keyframes`
  0%, 100% {
    transform: rotate(-45deg) translateX(0);
  }
  50% {
    transform: rotate(-45deg) translateX(-5px);
  }
`;

const BackButton = styled.button`
  align-self: flex-start;
  margin: 20px;
  padding: 10px 20px;
  background-color: #007bff; /* Color de fondo primario en azul */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000; /* Z-index alto */

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  .arrow {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(-45deg);
    margin-right: 8px;
    transition: border-color 0.3s, transform 0.3s;
    animation: ${arrowBounce} 1s infinite;
  }

  &:hover .arrow {
    border-top-color: #fff;
    border-left-color: #fff;
    transform: rotate(-45deg) translateX(-5px);
  }
`;

const BotonRegresar = () => {
  const navigate = useNavigate();

  return (
    <BackButton onClick={() => navigate(-1)}>
      <span className="arrow"></span>
      Regresar
    </BackButton>
  );
};

export default BotonRegresar;