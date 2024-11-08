import React from 'react';
import styled from 'styled-components';

const VerUserButton = () => {
  return (
    <StyledWrapper>
      <button>
        <span>Ver todos</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    --fs: 1.25em;
    --col1: white; /* Color de la letra en blanco */
    --col2: rgba(64, 224, 208, 0.603); /* Color turquesa claro */
    --col3: #40E0D0; /* Color turquesa */
    --col4: #008080; /* Color turquesa oscuro */
    --pd: .5em .65em;
    display: grid;
    align-content: baseline;
    appearance: none;
    border: 0;
    grid-template-columns: min-content 1fr;
    padding: var(--pd);
    font-size: var(--fs);
    color: var(--col1);
    background-color: var(--col3);
    border-radius: 6px;
    text-shadow: 1px 1px var(--col4);
    box-shadow: inset -2px 1px 1px var(--col2),
      inset 2px 1px 1px var(--col2);
    position: relative;
    transition: all .75s ease-out;
    transform-origin: center;
  }

  button span {
    color: var(--col1); /* Color del texto en blanco */
  }

  button:hover {
    color: var(--col4);
    box-shadow: inset -2px 1px 1px var(--col2),
      inset 2px 1px 1px var(--col2),
      inset 0px -2px 20px var(--col4),
      0px 20px 30px var(--col3),
      0px -20px 30px var(--col2),
      1px 2px 20px var(--col4);
    text-shadow: 1px 1px var(--col2);
  }

  button:active {
    animation: offset 1s ease-in-out infinite;
    outline: 2px solid var(--col2);
    outline-offset: 0;
  }

  button::after,
  button::before {
    content: '';
    align-self: center;
    justify-self: center;
    height: .5em;
    margin: 0 .5em;
    grid-column: 1;
    grid-row: 1;
    opacity: 1;
  }

  button::after {
    position: relative;
    border: 2px solid var(--col4);
    border-radius: 50%;
    transition: all .5s ease-out;
    height: .1em;
    width: .1em;
  }

  button:hover::after {
    border: 2px solid var(--col3);
    transform: rotate(-120deg) translate(10%, 140%);
  }

  button::before {
    border-radius: 50% 0%;
    border: 4px solid var(--col4);
    box-shadow: inset 1px 1px var(--col2);
    transition: all 1s ease-out;
    transform: rotate(45deg);
    height: .45em;
    width: .45em;
  }

  button:hover::before {
    border-radius: 50%;
    border: 4px solid var(--col1);
    transform: scale(1.25) rotate(0deg);
    animation: blink 1.5s ease-out 1s infinite alternate;
  }

  button:hover > span {
    filter: contrast(150%);
  }

  @keyframes blink {
    0% {
      transform: scale(1, 1) skewX(0deg);
      opacity: 1;
    }

    5% {
      transform: scale(1.5, .1) skewX(10deg);
      opacity: .5;
    }

    10%,
    35% {
      transform: scale(1, 1) skewX(0deg);
      opacity: 1;
    }

    40% {
      transform: scale(1.5, .1) skewX(10deg);
      opacity: .25;
    }

    45%,
    100% {
      transform: scale(1, 1) skewX(0deg);
      opacity: 1;
    }
  }

  @keyframes offset {
    50% {
      outline-offset: .15em;
      outline-color: var(--col1);
    }

    55% {
      outline-offset: .1em;
      transform: translateY(1px);
    }

    80%,
    100% {
      outline-offset: 0;
    }
  }
`;

export default VerUserButton;