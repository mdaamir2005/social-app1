import CustomRoutes from "./component/CustomRoutes";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { GlobalContext } from "./context/context";
import "./App.css"
function App() {
  let {state  ,dispatch} = useContext(GlobalContext)
  const firebaseConfig = {
    apiKey: "AIzaSyD1t8ikNf2gnk0rjdDSECIdniE_LvEMFsY",
    authDomain: "social-app1-4104a.firebaseapp.com",
    projectId: "social-app1-4104a",
    storageBucket: "social-app1-4104a.firebasestorage.app",
    messagingSenderId: "1068431266363",
    appId: "1:1068431266363:web:50bdb375a1cc39bd11821e"
  };
  const app = initializeApp(firebaseConfig);
 
  useEffect(()=>{
   

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        dispatch({type: "USER_LOGIN" , payload:user})
        console.log(user)
        // ...
      } else {
        // User is signed out
        // ...
        dispatch({type: "USER_LOGOUT" })

        console.log("user not found")
      }
    });


  },[])

  return (
    <div >
<CustomRoutes/>




    </div>
  );
}

export default App;
