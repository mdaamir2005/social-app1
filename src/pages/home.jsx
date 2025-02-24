import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/context'
import { getAuth, sendEmailVerification, signOut, updateEmail, verifyBeforeUpdateEmail } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, onSnapshot, query } from "firebase/firestore";
import moment from 'moment/moment';
import { Link } from 'react-router';
import axios from 'axios';
const Home = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD1t8ikNf2gnk0rjdDSECIdniE_LvEMFsY",
    authDomain: "social-app1-4104a.firebaseapp.com",
    projectId: "social-app1-4104a",
    storageBucket: "social-app1-4104a.firebasestorage.app",
    messagingSenderId: "1068431266363",
    appId: "1:1068431266363:web:50bdb375a1cc39bd11821e"
  };
  const app = initializeApp(firebaseConfig);
  
    

  let { state, dispatch } = useContext(GlobalContext)
  let [showForm, setShowForm] = useState(false)
  let [newEmail, setNewEmail] = useState("")
  
  let [posts, setPosts] = useState([])
  let [postCaption, setPostCaption] = useState("")
  let [file, setFile] = useState("")

  const auth = getAuth();
  const changeEmail = (e) => {
    e.preventDefault();
    setShowForm(true);
    verifyBeforeUpdateEmail(auth.currentUser, newEmail).then((res) => {
      // Email updated!
      // ...
      console.log(newEmail)
      console.log("email updated", res)
    }).catch((error) => {
      // An error occurred
      // ...
      console.log(error)
    });

  }
  const verificationSend = () => {
    sendEmailVerification(auth.currentUser)
      .then((res) => {
        // Email verification sent!
        // ...
        console.log(res)
      });
  }
  const logoutUser = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }
  const db = getFirestore(app);
  const getPost = async () => {
    const db = getFirestore(app);


    const q = query(collection(db, "posts"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setPosts((prev) => [...prev, doc.data()])
    });
  }
  useEffect(() => {
    let unsubscribe;
   const getRealTimePost = () =>{
    const q = query(collection(db, "posts"));
 unsubscribe = onSnapshot(q, (querySnapshot) => {
  let realTimePost = []
  querySnapshot.forEach((doc) => {
    realTimePost.push(doc.data())

      
  });
  setPosts(realTimePost)
  
});

}
getRealTimePost()
    console.log(posts)
    console.log("mount")
    return () => {
      unsubscribe()
    }
  }, [])
  const addPost = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "post-image");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dinmqooqb/upload", formData);
      const docRef = await addDoc(collection(db, "posts"), {
        userName: state.user?.displayName,
        userEmail: state.user?.email,
        userProfile: state.user?.photoURL,
        userId: state.user?.uid,
        postText: postCaption,
        postDate: new Date().getTime(),
        postFile: res.data.url
        

      });
      console.log("Document written with ID: ", docRef.id);
      setPostCaption("")
      console.log(res.data)
    }
    
    catch (e) {
      console.error("Error adding document: ", e);
    }

  }
  return (
    <div>
      <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>  <button onClick={() => setShowForm((oldValue) => !oldValue)}>
          {(showForm) ? "Hide" : "Show"} Form
        </button>
        <Link to={"/profile"} >profile</Link>

          {(showForm) ?
            <form onSubmit={changeEmail} >
              <input type="email" placeholder='NEW EMAIL' value={newEmail} onChange={(e) => { setNewEmail(e.target.value) }} />
              <button type='submit' >change email</button>
            </form>
            :
            null
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
          <img style={{ height: '200px', width: '200px', borderRadius: '50%' }} src={state?.user.photoURL} alt="" />
          <div style={{ fontSize: '28px' }}>{state.user?.displayName}</div>
          <p>{state?.user.email}</p>




          {state?.user.emailVerified == false ?
            <button onClick={verificationSend}>send verification</button>
            :
            null
          }
        </div>
        <div>
          {state?.isLogin == true ?
            <button onClick={logoutUser}>logout</button>
            :

            null}

        </div>
      </div>
      <div>

        <form onSubmit={addPost}>
          <input type="text" value={postCaption} onChange={(e) => { setPostCaption(e?.target.value) }} />
          <input type="file"  onChange={(e) => { setFile(e?.target.files[0]) }} />


          <button>add post</button>
        </form>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {

          posts?.map((eachPost, i) => {
            return (

              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ border: '1px solid black', width: '50%', height: '500px', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <div>
                        <img src={eachPost.userProfile} height={"50px"} width={"50px"} style={{ borderRadius: '50%' }} />

                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', }}>
                        <h3>{eachPost?.userName}</h3>
                        <p style={{ marginTop: '-15px' }}>{moment(eachPost?.postDate).fromNow()}</p>
                      </div>


                    </div>
                    <div>
                      <p>{eachPost?.postText}</p>

                      <img src={eachPost?.postFile} alt="" style={{width:"100%"}} />
                    </div>
                  </div>
                </div>
              </div>
            )




          })

        }
      </div>
    </div>



  )
}

export default Home