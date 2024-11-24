# PaymentgatewayIntegrationDemo

Code is on the master branch! 

In this project, 
I've integrated Razorpay payment gateway. 

Step1: 
Add the checkout script. 
<script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
Step2: 
Create orderId with razorpay and simultaniously we create the order in our server. 
Step3: 
Lauch the razorpay checkout page and pay. 

Before that, In real applications, like for an e-commerce app, we can authorize the user and their orders before proceeding with the payment. 
1. We can store the userId, JWT token Id in encrypted storage.
2. We can use CryptoJS library for this functionality.
3. After that we can decrypt the userId/Token or other info if any when needed.
4. We can also take care of other security measures like using HTTPS, CSP headers etc.
5. We can store the API key as an .env variable for security reasons or we may also store it in server and get it by API call for enhanced security.
6. We have a handler function in our checkout flow. When we make payment, razorpay returns response.razorpay_payment_id,  response.razorpay_order_id, response.razorpay_signature as response. We can store this
in our server as well.

For Server Side, 
1. We can have a order table where we can save orders for a particular user.
2. We can have payments table where we can save details for each user and order Id
3. We can update the records based upon the response we are getting from razorpay api after making a Payment. 


