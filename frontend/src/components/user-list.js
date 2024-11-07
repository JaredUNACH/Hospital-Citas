import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__title">Lista de usuarios</div>
        <div className="card__data">
          <div className="card__right">
            <div className="item">
              Pacientes
              <div className="buttons">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Eliminar</button>
              </div>
            </div>
            <div className="item">
              Doctores
              <div className="buttons">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Eliminar</button>
              </div>
            </div>
            <div className="item">
              Administradores
              <div className="buttons">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    background: rgb(44, 44, 44);
    font-family: "Courier New", Courier, monospace;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .card__title {
    color: white;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid rgb(167, 159, 159);
    font-size: 1.2rem;
    text-align: center;
  }

  .card__data {
    font-size: 0.9rem;
    padding: 10px;
  }

  .item {
    padding: 10px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item:nth-child(even) {
    background: rgb(234, 235, 234);
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .edit-button, .delete-button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit-button {
    background-color: #4CAF50;
    color: white;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
  }

  .edit-button:hover {
    background-color: #45a049;
  }

  .delete-button:hover {
    background-color: #e53935;
  }
`;

export default Card;