// import { Button, TextField, IconButton, InputAdornment } from '@mui/material';

// import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
// import React, { useState } from 'react'
// import { Link } from 'react-router';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// const Signup = () => {
//   const auth = getAuth();
//   const [userName,setUserName] = useState("");

//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

  
//   const createUser = (e)=>{
//     e.preventDefault();
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up 
//       const user = userCredential.user;
//       // ...
//       console.log("res",user)
//       const auth = getAuth();
//       updateProfile(auth.currentUser, {
//         displayName:userName, photoURL: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
//       }).then(() => {
//         // Profile updated!zz
//         // ...
      
//       }).catch((error) => {
//         // An error occurred
//         // ...
        
//       });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//       console.log(error)
//     });



//   }
//   return (
// <div>
//         <div style={{display:'flex',justifyContent:'center', height:'900px',alignItems:'center'}}>
//         <form onSubmit={createUser} style={{display:'flex',flexDirection:'column',height:'600px',width:'30%',gap:'50px',padding:'40px 60px 40px 60px',boxShadow:' 0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)'}}>
         
//           <h2 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:'32px'}}>Signup</h2>
//           <TextField id="standard-basic" label="Enter your name " variant="standard" type="text"   value={userName} onChange={(e)=>{setUserName(e?.target.value)}}/>
       
//         <TextField id="standard-basic" label="Enter your email " variant="standard" type="text"   value={email} onChange={(e)=>{setEmail(e?.target.value)}}/>
//         <TextField
//             id="standard-password-input"
//             label="Enter your password"
//             variant="standard"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => { setPassword(e?.target.value); }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
              
//           />
//         <Button variant="contained" type='submit'>Signup</Button>
// <p style={{textAlign:'center',fontSize:'20px'}}>Already have an account? <Link to={"/login"}>Click here</Link></p>

        
        
        
//         </form>
        
        
//             </div>
//             </div>
//   )
// }

// export default Signup




import { Button, TextField, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';

import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup';
const Signup = () => {
  const auth = getAuth();
  const [userName,setUserName] = useState("");
const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
 const [invalidMsg, setInvalidMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  


const signupValidation = yup.object({
  userName: yup
  .string("Username must be a string")
  
  .required('Username is required'),
    email: yup
      .string("Email must be a string")
      .email("Please enter a valid email address")
      .required('Email is required'),
    password: yup

      .string()
      .required('Please Enter your password')
      .min(8, 'Password must be 8 characters long')
      // .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
  });




const signupFormik = useFormik({
    initialValues: {
      userName :"",
      email: "",
      password: ""
    },
    validationSchema: signupValidation,
    onSubmit: (values) => {
      if (!values.email || !values.password || !values.userName) {
        setErrorMessage("Please fill in all fields");
        setAlertOpen(true);
      } else {
        console.log(values.email, values.password);

        createUser()
       
      }
    }
  });
  const alertClose = () => {
    setAlertOpen(false);
  };














  const createUser = (e)=>{
    
    createUserWithEmailAndPassword(auth, signupFormik.values.email, signupFormik.values.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      console.log("res",user)
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName:signupFormik.values.userName, photoURL: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
      }).then(() => {
        // Profile updated!zz
        // ...
      
      }).catch((error) => {
        // An error occurred
        // ...
        
      });
    })
    .catch((error) => {
      setInvalidMsg(true)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setErrorMsg(errorMessage)
      console.log(error)
    });



  }
  return (
<div>
        <div style={{display:'flex',justifyContent:'center', height:'900px',alignItems:'center'}}>
        <form onSubmit={signupFormik.handleSubmit} style={{display:'flex',flexDirection:'column',height:'650px',width:'30%',gap:'50px',padding:'40px 60px 40px 60px',boxShadow:' 0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)'}}>
        {invalidMsg ?
            < p style={{ color: "red", textAlign: "center", fontFamily: 'serif' }}>{errorMsg}</p>
            :
            null

          }
          <h2 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:'32px'}}>Signup</h2>
          <TextField id="standard-basic" label="Enter your name " variant="standard" type="text" name='userName'   value={signupFormik.values.userName} onChange={signupFormik.handleChange}
           error={signupFormik.touched.userName && Boolean(signupFormik.errors.userName)}
           helperText={signupFormik.touched.userName && signupFormik.errors.userName}
           fullWidth
          />
       
        <TextField id="standard-basic" label="Enter your email " variant="standard" type="text"  name='email'
            value={signupFormik.values.email}
            onChange={signupFormik.handleChange}
            error={signupFormik.touched.email && Boolean(signupFormik.errors.email)}
            helperText={signupFormik.touched.email && signupFormik.errors.email}
            fullWidth/>
        <TextField
            id="standard-password-input"
            label="Enter your password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            name='password'

            onChange={signupFormik.handleChange}
            error={signupFormik.touched.password && Boolean(signupFormik.errors.password)}
            helperText={signupFormik.touched.password && signupFormik.errors.password}
            fullWidth
            
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
             <Snackbar open={alertOpen} autoHideDuration={3000} onClose={alertClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}>
                    <Alert onClose={alertClose} severity="error" sx={{ width: '100%' }}>
                      {errorMessage}
                    </Alert>
                  </Snackbar>
            </div>
  )
}

export default Signup