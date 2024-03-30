import React from 'react';
import LoginForm from './LoginForm';
import { useState } from 'react';

export default function LoginDropdown() {
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="login-dropdown">
      <LoginButton isOpen={isOpen} toggleDropdown={() => setIsOpen(!isOpen)} />
      {isOpen && <LoginForm />}
    </div>
  );
};

const LoginButton = ({ isOpen, toggleDropdown }) => {
  return (
    <button className="login-button" onClick={toggleDropdown}>
      Login
    </button>
  );
};

