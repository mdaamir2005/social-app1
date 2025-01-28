import { Button, TextField, IconButton, InputAdornment } from '@mui/material';

import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Signup = () => {
  const auth = getAuth();
  const [userName,setUserName] = useState("");

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  
  const createUser = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      console.log("res",user)
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName:userName, photoURL: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
      }).then(() => {
        // Profile updated!
        // ...
      
      }).catch((error) => {
        // An error occurred
        // ...
        
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(error)
    });



  }
  return (
<div>
        <div style={{display:'flex',justifyContent:'center', height:'900px',alignItems:'center'}}>
        <form onSubmit={createUser} style={{display:'flex',flexDirection:'column',height:'600px',width:'30%',gap:'50px',padding:'40px 60px 40px 60px',boxShadow:' 0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)'}}>
         
          <h2 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:'32px'}}>Signup</h2>
          <TextField id="standard-basic" label="Enter your name " variant="standard" type="text"   value={userName} onChange={(e)=>{setUserName(e?.target.value)}}/>
       
        <TextField id="standard-basic" label="Enter your email " variant="standard" type="text"   value={email} onChange={(e)=>{setEmail(e?.target.value)}}/>
        <TextField
            id="standard-password-input"
            label="Enter your password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e?.target.value); }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
              
          />
        <Button variant="contained" type='submit'>Signup</Button>
<p style={{textAlign:'center',fontSize:'20px'}}>Already have an account? <Link to={"/login"}>Click here</Link></p>

        
        
        
        </form>
        
        
            </div>
            </div>
  )
}

export default Signup