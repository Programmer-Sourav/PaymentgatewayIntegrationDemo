import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './Pages/LoginPage'
import { Route, Routes } from 'react-router'
import SignUpPage from './Pages/SignUpPage'
import ProductPage from './Pages/ProductPage'

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element = {<LoginPage/>}/>
          <Route path='/login' element={ <LoginPage/>}/>
          <Route path='/signup' element= {<SignUpPage/>}/>
          <Route path='/buy' element= {<ProductPage/>}/>
        </Routes>
      </div>
     
    </>
  )
}

export default App
