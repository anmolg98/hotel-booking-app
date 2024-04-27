import React from 'react'

export default function LoginForm() {
    return (
        <>
        <form className="login-form">
          Username : 
          <input></input><br></br>
          Password :
          <input type='password'></input>
        </form>
        <button>Login</button>
        </>
      );
 };

