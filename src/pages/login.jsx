
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("res", user);
      })
      .catch((error) => {
        console.log(error);
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
        <form onSubmit={loginUser} style={{
          display: 'flex', flexDirection: 'column', height: 'auto', width: '30%',
          padding: '40px 60px 40px 60px', boxShadow: ' 0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)'
        }}>
          <h2 style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: '32px' }}>Login</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'35px',height:'auto'

          }}>
            <div style={{display:'flex',flexDirection:'column',gap:'60px'}}>
          <TextField
            id="standard-basic"
            label="Enter your email"
            variant="standard"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e?.target.value); }}
          />

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
            style={{ marginBottom: 20 }} // Prevents extra space
          />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'30px'}}>
          <div onClick={forgetPassword} style={{
            textDecoration: 'underline', cursor: 'pointer', color: '#551a9a', fontSize: '18px', textAlign: 'center'
          }}>Forget Password?</div>
          <Button variant="contained" type='submit'>Login</Button>
          <p style={{ textAlign: 'center', fontSize: '20px' }}>Not registered? <Link to={"/signup"}>Create account</Link></p>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

