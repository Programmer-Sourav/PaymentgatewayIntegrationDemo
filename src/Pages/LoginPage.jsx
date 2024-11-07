import { useNavigate } from "react-router"
import * as CryptoJS from 'crypto-js';

import "../Stylesheets/loginpage.css"
import { useState } from "react"

export default function LoginPage(){


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

    async function authenticateUser(userEmail, userPassword){
        console.log(1234, userEmail, userPassword)
        const loginUrl = "https://84542494-0c0c-4997-8470-7e3c6dde1762-00-3lwqeuxa9sd4o.sisko.replit.dev/login"
        try{
           const response = await fetch(loginUrl, 
            {
                headers: {
                    "Content-Type": "application/json",
                  },
                method: "POST", 
                body: JSON.stringify({email: userEmail, password: userPassword})
            }
           );
          const data = await response.json();
          //console.log(1111, data)
          if(data.statusCode === 403){
            alert(data.message)
          }
          if(data.statusCode === 400){
            alert(data.message)
          }
          if(data.statusCode ===200){
            navigate("/buy")
          }
          localStorage.setItem("token-key", encrypt(data.details.token))
          //console.log(223, data.details.id)
          localStorage.setItem("userId", encrypt(JSON.stringify(data.details.id)))
          //console.log(555, localStorage.getItem("userId"))
        }
        catch(error){
            console.error("Error ", error)
        }
    }

    return(
        <div> 
            <h1> Login </h1>
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