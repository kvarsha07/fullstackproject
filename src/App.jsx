import { useState } from 'react'

import './App.css'
import Nav from './Components/Nav'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import SignUp from './Components/SignUp'
// import PrivateComponent from './Components/PrivateComponent'

function App() {


  return (
    <>
    <BrowserRouter>
    <div>
      <Nav/>
     <Routes >
        {/* <Route element={<PrivateComponent/>}/> */}
        <Route path='/' element={<h1>product listing</h1>}/> 
        <Route path='/add' element={<h1>ADD product listing</h1>}/> 
        <Route path='/update' element={<h1>update</h1>}/>
        <Route path='/logout' element={<h1>LOGIN</h1>}/>
        <Route path='/profile' element={<h1>profile</h1>}/>
        <Route path='/signup' element={<SignUp/>}/>
        </Routes>
    </div>
    </BrowserRouter> 
     <Footer/>
    
    </>
  )
}

export default App
