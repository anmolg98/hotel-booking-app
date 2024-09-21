import React from 'react'
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';


export default function Signup() {
    
    const isValidPassword = (password) => {
        // Check for minimum length
        if (password.length < 8) {
          return false;
        }
        
        // Check for at least one number
        const hasNumber = /\d/.test(password);
        
        // Check for at least one special character
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return hasNumber && hasSpecialChar;
      };
      

    let [passwordIconState,setpasswordIconState] = useState("empty")
    let [userNameTakenState,setUserNameTakenState]=useState("not taken")

    let passWordchangeHandler=function(event){
           let currentPassword = event.target.value;
           if(currentPassword.length===0) setpasswordIconState("empty")
           else if(isValidPassword(currentPassword)===true) setpasswordIconState("correct")
           else setpasswordIconState("incorrect")
    }

    let userNameonchangeHandler=function(event){
        let currentUserName = event.target.value;
        axios.get("http://localhost:8080/checkUsername?username="+currentUserName).
        then(response =>{
            console.log("Response1:",response.data);
            if(response.data==true) setUserNameTakenState("taken");
            else{
                setUserNameTakenState("not taken")
            }
        }

        ).catch(error => {
            console.log("Error: ",error);
        })

    }

    return (
        
        <Container style={{border : '1px', padding : '10px' }}>
        
        <Card>
            <CardHeader>
                This is Signup Form
            </CardHeader>
            <CardBody>
        <form className="login-form">
            First Name : 
          <input></input><br></br>
          Last Name : 
          <input></input><br></br>
          Username : 
          <input onChange={userNameonchangeHandler}></input>
          {(userNameTakenState==='taken')&& <div>This userName is already taken</div>}
          <br></br>
          Password :
          <input type='password' onChange={passWordchangeHandler}></input> 
          
          
             {(passwordIconState==='correct')&&
                <img src="./resources/images.png " style={{ width: '50px', height: '50px' }}></img>
             }
             {(passwordIconState==='incorrect')&&
                <img src="./resources/check-mark-and-cross-mark-icon-tick-symbol-in-red-color-illustration-vector.jpg" style={{ width: '50px', height: '50px' }}></img>
             }

          

           Password should be atleast 8 characters, with a number and a special character 
          <br>
          </br>
          <button >Signup</button>
        </form>
        </CardBody>
        </Card>
        </Container>
      );
 };

