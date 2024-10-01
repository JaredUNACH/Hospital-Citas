import { useEffect, useState } from 'react';

const useLoginScript = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container-login');

    if (signUpButton && signInButton && container) {
      const handleSignUpClick = () => {
        container.classList.add("right-panel-active");
        setIsSignUp(true);
      };

      const handleSignInClick = () => {
        container.classList.remove("right-panel-active");
        setIsSignUp(false);
      };

      signUpButton.addEventListener('click', handleSignUpClick);
      signInButton.addEventListener('click', handleSignInClick);

      // Cleanup function to remove event listeners
      return () => {
        signUpButton.removeEventListener('click', handleSignUpClick);
        signInButton.removeEventListener('click', handleSignInClick);
      };
    }
  }, []);

  return isSignUp;
};

export default useLoginScript;