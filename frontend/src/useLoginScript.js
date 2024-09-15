import { useEffect } from 'react';

const useLoginScript = () => {
  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      const handleSignUpClick = () => {
        container.classList.add("right-panel-active");
      };

      const handleSignInClick = () => {
        container.classList.remove("right-panel-active");
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
};

export default useLoginScript;