import React from "react";
import styled from "styled-components";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const SocialButtons = ({ onGoogleLogin, onGoogleRegister, isSignUp }) => {
  const clientId = "312226628197-vuug8kd54rhent80sea8naghsj50crd4.apps.googleusercontent.com"; // ID de cliente de Google

  const handleSuccess = (response) => {
    if (isSignUp) {
      onGoogleRegister(response);
    } else {
      onGoogleLogin(response);
    }
  };

  const handleFailure = (response) => {
    console.error("Google Sign-In Error:", response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <StyledWrapper>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </StyledWrapper>
    </GoogleOAuthProvider>
  );
};

const StyledWrapper = styled.div`
  .google-login {
    max-width: 320px;
    display: flex;
    padding: 0.5rem 1.4rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    gap: 0.75rem;
    color: rgb(65, 63, 63);
    background-color: #fff;
    cursor: pointer;
    transition: all 0.6s ease;
  }

  .google-login svg {
    height: 24px;
  }

  .google-login:hover {
    transform: scale(1.02);
  }
`;

export default SocialButtons;