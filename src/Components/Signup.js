import React from 'react'
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import { useState,useRef } from 'react';
import axios from 'axios';



export default function Signup() {

    const userRef = useRef(null);
    const passwordRef = useRef(null); 
    
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(null);
    let[inputValues,setInputValues] = useState(
        {
          input1:'',
          input2:'',
}
    )

    const signUpClickHandler  = ()=>{
             console.log("Inside SignUpClick Handler")
            if(passwordIconState==='correct'&&userNameTakenState==='not taken'){
                if(inputValues.input1.length>0&&inputValues.input2.length>0){
                    let signUpurl = "http://localhost:8080/signupuser";
                    let signupJSON = {
                         firstName:inputValues.input1,
                         lastName:inputValues.input2,
                         userName:userRef.current.value,
                         password:passwordRef.current.value,
                    }
                    console.log(signupJSON);
                    
                    axios.post(signUpurl,signupJSON).then((result)=>{
                         console.log(result)
                         setResponseMessage(result.data)
                         setError(null)
                    }).catch((err)=>{
                         console.log(err);
                         setError('Failed to sign up');
                         setResponseMessage('');
                    })
                    

                }
                else{
                    alert("First Name or Last Name is empty");
                }
                
               
            }
            else{
                alert("Please enter valid username or password");
            }
    }
    
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

    
    const inputChangeHandler = (event)=>{
           const {id,value} = event.target;
           setInputValues((prevInputs)=>({
            ...prevInputs,
            [id] : value
           }))
          console.log(inputValues);
    }

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
          <input id="input1" 
          type="text"
          value={inputValues.input1}
          onChange={inputChangeHandler} ></input><br></br>
          Last Name : 
          <input id="input2" 
          type = "text"
          value={inputValues.input2}
          onChange={inputChangeHandler}></input><br></br>
          Username : 
          <input 
          ref={userRef}
          onChange={userNameonchangeHandler}
          autoComplete="username"></input>
          {(userNameTakenState==='taken')&& <div>This userName is already taken</div>}
          <br></br>
          Password :
          <input 
          ref={passwordRef}
          type='password' onChange={passWordchangeHandler}
          autoComplete="current-password"
          ></input> 
          
          
             {(passwordIconState==='correct')&&
                <img src="./resources/images.png " style={{ width: '50px', height: '50px' }}></img>
             }
             {(passwordIconState==='incorrect')&&
                <img src="./resources/check-mark-and-cross-mark-icon-tick-symbol-in-red-color-illustration-vector.jpg" style={{ width: '50px', height: '50px' }}></img>
             }

          

           Password should be atleast 8 characters, with a number and a special character 
          <br>
          </br>
          <button onClick={signUpClickHandler}>Signup</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>} {/* Display success message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </CardBody>
        </Card>
        </Container>

      );
 };

