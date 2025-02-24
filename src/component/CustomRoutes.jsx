import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Home from '../pages/home'
import Login from '../pages/login'
import Signup from '../pages/signup'
import { GlobalContext } from '../context/context'
import Profile from '../pages/profile'

const CustomRoutes = () => {
   let {state ,dispatch} = useContext(GlobalContext)
  return (
    <div>
     
{(state.isLogin == true)?
    <Routes>
        
        <Route index element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>

        
        <Route path='*' element={<Navigate to={"/"}/>}/>
      
    </Routes>
    :
    (state.isLogin == false)?
    <Routes>
    
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='*' element={<Navigate to={"/login"}/>}/>
  
</Routes>
:
<p>loading...</p>
}
    </div>
  )
}

export default CustomRoutes