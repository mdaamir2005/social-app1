import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GithubAuthProvider,signInWithPopup } from "firebase/auth";

const Login = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidMsg, setInvalidMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  
  const [showPassword, setShowPassword] = useState(false);
const loginWithGithub = (e)=>{
  e.preventDefault()
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    console.log(email,error)
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });


}
  const loginValidation = yup.object({
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



  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      if (!values.email || !values.password) {
        setErrorMessage("Please fill in all fields");
        setAlertOpen(true);
      } else {
        console.log(values.email, values.password);

        loginUser()
      }
    }
  });



  const alertClose = () => {
    setAlertOpen(false);
  };

  const loginUser = (e) => {

    signInWithEmailAndPassword(auth, loginFormik.values.email, loginFormik.values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("res", user);
      })
      .catch((error) => {
        console.log(error);
        setInvalidMsg(true)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setErrorMsg(errorMessage)
      });
  };

  const forgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password reset email send");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', height: '900px', alignItems: 'center' }}>
        <form onSubmit={loginFormik.handleSubmit} style={{
          display: 'flex', flexDirection: 'column', height: 'auto', width: '30%',
          padding: '40px 60px 40px 60px', boxShadow: ' 0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)'
        }}>
          {invalidMsg ?
            < p style={{ color: "red", textAlign: "center", fontFamily: 'serif' }}>{errorMsg}</p>
            :
            null

          }

          <h2 style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: '32px' }}>Login</h2>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '35px', height: 'auto'

          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              <TextField
                id="standard-basic"
                label="Enter your email"
                variant="standard"
                type="email"
                name='email'
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                helperText={loginFormik.touched.email && loginFormik.errors.email}
                fullWidth
              />

              <TextField
                id="standard-password-input"
                label="Enter your password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                value={loginFormik.values.password}
                name='password'

                onChange={loginFormik.handleChange}
                error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                helperText={loginFormik.touched.password && loginFormik.errors.password}
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
                style={{ marginBottom: 20 }} // Prevents extra space
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div onClick={forgetPassword} style={{
                textDecoration: 'underline', cursor: 'pointer', color: '#551a9a', fontSize: '18px', textAlign: 'center'
              }}>Forget Password?</div>
              <Button variant="contained" type='submit'>Login</Button>

              <p style={{ textAlign: 'center', fontSize: '20px' }}>Not registered? <Link to={"/signup"}>Create account</Link></p>
            </div>
          </div>
        </form>
        <form onSubmit={loginWithGithub}>
        <Button variant="contained" type='submit'>Login with Github</Button>

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
  );
};

export default Login;

