import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { adsPage  } from "./adsForm.js";
import { insertFunc } from "./adsFunc.js";
import {
    getDatabase,
    ref, get,
    set, update
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

import { firebaseConfig } from './firebase.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const user = auth.currentUser;

const body = document.querySelector("body");

onAuthStateChanged(auth, (user) => {
    if (user) {
      adsPage();
      insertFunc();
      const logout = document.createElement("div");
      logout.setAttribute('id', 'loggedInDiv');
      logout.innerHTML = `<input type="submit" id="logout" value="logout">  ${user.email}`;
      body.insertBefore(logout, body.firstChild);
  
      document.getElementById("logout").addEventListener("click", (e) => {
        e.preventDefault();
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log("Signed out");
          })
          .catch((error) => {
            // An error happened.
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      });
  
      const uid = user.uid;
      console.log(uid);
      console.log("user logged in");
    } else {
      body.innerHTML = `
      <div id="logDiv">
      <div>
        <input type="text" id="user" placeholder="Enter email">
        <input type="password" id="pass" placeholder="Enter password">
        <input type="submit" id="submit" value="register">
        <input type="submit" id="login" value="login">
        </div>
        </div>
      `;
  
      document.querySelector("#submit").addEventListener("click", (e) => {
        e.preventDefault();
        const user_email = document.getElementById("user").value;
        const user_pass = document.getElementById("pass").value;
        createUserWithEmailAndPassword(auth, user_email, user_pass)
          .then((userCredential) => {
            const user = userCredential.user;
            const loginTime = new Date();
            set(ref(database, "users/" + user.uid), {
              email: user_email,
              role: "simple_user",
              timestamp: `${loginTime}`,
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      });
  
      document.querySelector("#login").addEventListener("click", (e) => {
        e.preventDefault();
        const user_email = document.getElementById("user").value;
        const user_pass = document.getElementById("pass").value;
        signInWithEmailAndPassword(auth, user_email, user_pass)
          .then((userCredential) => {
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      });
    }
  });
  
  export { onAuthStateChanged }