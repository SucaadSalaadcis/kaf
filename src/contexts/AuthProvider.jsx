import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config"
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create an account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // signup with gmail
  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  // login using email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // logout 
  const logOut = () => {
    return signOut(auth);
  }

  // update profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photoURL
    })
  }

  // check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      // console.log(currentUser);
      setUser(currentUser);
      if (currentUser) {
        const userInfo = {
          email: currentUser.email
        };
        // generating token
        axios.post('http://localhost:7000/jwt', userInfo).then((res) => {
          // console.log(res.data.token); // token
          // userkasta sogalo website ka token lo generate gareyna
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        });
      } else {
        localStorage.removeItem('access-token');
        // when user is login you have token but we user logout the token will be removed from localStorage
      }

      setLoading(false);
    });

    return () => {
      return unsubscribe();
    }
  }, [])


  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    updateUserProfile,
    loading
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
