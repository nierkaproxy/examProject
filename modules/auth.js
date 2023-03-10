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
import { adminFunc } from "./admin.js";
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth();

const user = auth.currentUser;

const body = document.querySelector("body");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // user is logged in
    const uid = user.uid;
    console.log(uid);
    const dbref = ref(database);
    // retrieve user role from database
    const userRoleRef = ref(database, `users/${uid}/role`);
    get(userRoleRef).then((snapshot) => {
      const userRole = snapshot.val();
      if (userRole === "admin") {
        body.innerHTML = `
        <div id="adminDiv">
          <div>
            <h5>Hello Admin</h5>
            <input type="text" id="categAdd" placeholder="Enter category to add">
            <input type="submit" id="addCategory" value="add">
            <input type="text" id="delUser" placeholder="Delete user">
            <input type="submit" id="delUserBut" value="delete">
          </div>
        </div>
      `
      const categAdd = document.getElementById('categAdd');
      const categAddButton = document.getElementById('addCategory');
      
      const addCateg = () => {
        set(ref(database, "Categories/"), {
          Category: categAdd.value
        })
        categAdd.value = '';

      }

      categAddButton.addEventListener('click', addCateg);

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
      } else {
      
        // load normal page content
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
  
        console.log("user logged in");
      }
    });
  } else {
    // user is not logged in
    body.innerHTML = `
      <div id="logDiv">
        <div>
          <h5>Please Log in or Register</h5>
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