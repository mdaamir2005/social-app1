import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/context'
import { getAuth, sendEmailVerification, signOut, updateEmail, verifyBeforeUpdateEmail } from 'firebase/auth'

const Home = () => {
  
  useEffect (()=>{
  },[])
  let {state , dispatch}= useContext(GlobalContext)
  let [showForm ,setShowForm] = useState(false)
  let  [newEmail ,setNewEmail] = useState("")
  const auth = getAuth();
  const changeEmail = (e) => {
    e.preventDefault();
    setShowForm(true);
    verifyBeforeUpdateEmail(auth.currentUser, newEmail).then((res) => {
      // Email updated!
      // ...
      console.log(newEmail)
      console.log("email updated",res)
    }).catch((error) => {
      // An error occurred
      // ...
      console.log(error)
    });
    
  }
  const verificationSend = ()=>{
    sendEmailVerification(auth.currentUser)
    .then((res) => {
      // Email verification sent!
      // ...
      console.log(res)
    });
  }
  const logoutUser =()=>{
    
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
  }
  
  return (
    <div>
      <h1>{state?.user.displayName}</h1>
      <h4>{state?.user.email}</h4>
     
  
       <button onClick={() => setShowForm((oldValue) => !oldValue)}>
        {(showForm) ? "Hide" : "Show"} Form
      </button>

{(showForm)?
<form  onSubmit={changeEmail} >
  <input type="email" placeholder='NEW EMAIL'  value={newEmail} onChange={(e)=>{setNewEmail(e.target.value)}} />
  <button type='submit' >change email</button>
</form>
:
null
}
{state?.user.emailVerified == false?
<button onClick={verificationSend}>send verification</button>
:
null
}
{state?.isLogin == true ?
 <button onClick={logoutUser}>logout</button>
 :
 
 null }
    </div>
  )
}

export default Home