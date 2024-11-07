import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import * as CryptoJS from 'crypto-js';


export default function SignUpPage(){

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    let SECRET_KEY = "123_LOC_STORAGE_AES_@12#3"


    function encrypt(txt){
      return CryptoJS.AES.encrypt(txt, SECRET_KEY).toString();
    }

    function decrypt(txtToDecrypt){
     return CryptoJS.AES.decrypt(txtToDecrypt, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }

    async function authenticateUser(userEmail, userPassword) {
        console.log(222, userEmail, userPassword)
        const signUpUrl = "https://84542494-0c0c-4997-8470-7e3c6dde1762-00-3lwqeuxa9sd4o.sisko.replit.dev/signup"
          try{
           const response = await fetch(
            signUpUrl, 
            {
            headers: {
                    "Content-Type": "application/json",
                  },
             method: "POST", 
             body: JSON.stringify({email: userEmail, password: userPassword})   
            }
           )

           const data = await response.json();
           if(data.statusCode===400)
            alert(`${data.message}, please Try with some other Email Id`)
           //console.log(222, data.statusCode, data, data.data.token, data.userCreated.userId)
           if(data.statusCode === 201)
           {
            navigate("/buy")
           }
           localStorage.setItem("token-key", encrypt(data.token))
           localStorage.setItem("userId", encrypt(data.userCreated.userId))
          }
          catch(error){
            console.error("Error "+error)
          }
    }

    return(
        <div> 
            <h1> Sign Up!</h1>
            <div>
              <input type="text" value={userEmail} placeholder="Enter your Email id" onChange={(e)=>{setUserEmail(e.target.value)}} className=""/>
            </div>
            <div>
            
              <input type="password" value={userPassword}  placeholder="Enter Password" onChange={(e)=>{setUserPassword(e.target.value)}} className=""/>
           
            </div>
            <button onClick={()=>{authenticateUser(userEmail, userPassword)}} >Login </button>
        </div>
    )
}