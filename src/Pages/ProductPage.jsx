import { useEffect, useState } from "react";
import "../Stylesheets/productpage.css"
import * as CryptoJS from 'crypto-js';

import DayCream from "../assets/daycream.webp"


//authorization to be completed..
//encrypted userid
//encrypted token
//store keys in ENV variable

export default function ProductPage(){

    const [priceOfTheProduct, setPriceOfTheProduct] = useState(250);

    let SECRET_KEY = "123_LOC_STORAGE_AES_@12#3"


    function encrypt(txt){
      return CryptoJS.AES.encrypt(txt, SECRET_KEY).toString();
    }

    function decrypt(txtToDecrypt){
     return CryptoJS.AES.decrypt(txtToDecrypt, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }

    const encrypteduserId = localStorage.getItem("userId")
    const userId = decrypt(encrypteduserId);

    async function addPaymentDetailsToServer(razorPayPaymentId,  razorPayOrderId, razorPaySignature){
        const orderUrl  =  "https://84542494-0c0c-4997-8470-7e3c6dde1762-00-3lwqeuxa9sd4o.sisko.replit.dev/createpayment"
        const orderId = localStorage.getItem("orderId")
        try{
          const response = await fetch(orderUrl, 
            {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({userId, paymentId: razorPayPaymentId, orderId, razorpay_orderId: razorPayOrderId, payment_signature: razorPaySignature})
            }
          )
          localStorage.removeItem("orderId");
          const data = await response.json();
          console.log(44445, data)
        }
        catch(error){

        }
    }
    async function createOrderInRemoteServer(event, userId, orderId, productId, price){
      const orderUrl  =  "https://84542494-0c0c-4997-8470-7e3c6dde1762-00-3lwqeuxa9sd4o.sisko.replit.dev/createorder" 
       try{
         const response = await fetch(orderUrl,
            {
                headers: {
                    "Content-Type": "application/json",
                  },
                method: "POST",
                body: JSON.stringify({userId, orderId, productId, price})
            }
         );
         const data = await response.json();
         //console.log(1111, data)
         const razorpayOrderId = data.razorpayResponse.id;
         if(data.statusCode === 201){
            //sendOrderToRzpServer(price, orderId);
            console.log(33342, razorpayOrderId)
            launchRazorPay(event, razorpayOrderId, productId, price, userId);
         }
       }
       catch(error){
        console.error("Error ", error)
       }
    }

    
    function buyOnClick (event){
         //add the price, orderid etc to the database
         //after that once payment is complete, existing order id will be updated with transaction id, status
         //redirect to payment gateway
        const orderId =  Math.floor(1000 + Math.random() * 9011)
        const productId = 123;
        const price = priceOfTheProduct;
        const encrypteduserId = localStorage.getItem("userId")
        const userId = decrypt(encrypteduserId);
        createOrderInRemoteServer(event, userId, orderId, productId, price)
        localStorage.setItem("orderId", orderId)
        //open the payment gateway screen
      
    }

    function launchRazorPay(event, orderId, productId, price,  userId){
        var options = {
            "key": import.meta.env.VITE_TEST_KEY, // Enter the Key ID generated from the Dashboard
            "amount":  price*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "PayDemo", //your business name
            "description": "Test Transaction",
            "image": "https://pbs.twimg.com/profile_images/1271385506505347074/QIc_CCEg_400x400.jpg",
            "order_id": String(orderId), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "localhost:5174/buy",
            handler: function (response) {
                // Get the payment_id from Razorpay's response
                console.log(response.razorpay_payment_id); // Payment ID
                console.log(response.razorpay_order_id); // Order ID
                console.log(response.razorpay_signature); // Signature for verification
               
                addPaymentDetailsToServer(response.razorpay_payment_id,  response.razorpay_order_id, response.razorpay_signature)

              },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Sourav nath", //your customer's name
                "email": "imsourav123@gmail.com",
                "contact": "9916723243" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        event.preventDefault();
    }

    async function checkPaymentCaptureStatusAfterPayment(){
        const paymentCaptureUrl = "https://84542494-0c0c-4997-8470-7e3c6dde1762-00-3lwqeuxa9sd4o.sisko.replit.dev/paymentCapture"; 
             try{
             const response = await fetch(paymentCaptureUrl,
                {
                    headers: {
                        "Content-Type": "application/json",
                      }
                }
             )
             const data = await response.json()
             console.log(34567, data)
             }
             catch(error){
                console.error(error)
             }
    }
    
    return(
        <div className="card">
            <img  src={DayCream} alt="product-image" className="pimage"/> 
            <h3>Day Cream - 100ml</h3>
            <p id="price"><span>Rs.</span> <span>{priceOfTheProduct}</span>  </p>
            <button onClick={(event)=>{buyOnClick(event)}} className="card-btn">Buy Now</button>
        </div>
    )
}