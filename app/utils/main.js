import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3ZG1zaZfV5LWri-yULiMrIkBY7T96Qno",
  authDomain: "authentication-93f21.firebaseapp.com",
  projectId: "authentication-93f21",
  storageBucket: "authentication-93f21.firebasestorage.app",
  messagingSenderId: "13852041270",
  appId: "1:13852041270:web:b3dc4e4208d6951abfb897",
  measurementId: "G-29J36KEKEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

// Function to handle Google sign-in
export function signInWithGoogle() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in user:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error during sign-in:", error.code, error.message);
      throw error;
    });
}

// Monitor auth state and handle login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Redirect to homepage only if not already there
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }
});
