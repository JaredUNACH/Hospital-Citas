import React from 'react';
import styled from 'styled-components';

const Search = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <StyledWrapper>
      <div className="input-container">
        <input
          className="input"
          name="text"
          type="text"
          placeholder="Buscar..."
          onChange={handleInputChange}
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    width: 100%;
    max-width: 270px;
    height: 60px;
    padding: 12px;
    font-size: 18px;
    font-family: "Courier New", monospace;
    color: #000;
    background-color: #fff;
    border: 4px solid #000;
    border-radius: 0;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 8px 8px 0 #000;
  }

  .input::placeholder {
    color: #888;
  }

  .input:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000;
  }

  .input:focus {
    background-color: #000;
    color: #fff;
    border-color: #ffffff;
  }

  .input:focus::placeholder {
    color: #fff;
  }

  .input-container {
    position: relative;
    width: 100%;
    max-width: 270px;
  }
`;

export default Search;