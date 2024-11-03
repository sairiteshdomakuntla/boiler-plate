"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { LiaApple } from "react-icons/lia";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "animate.css";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3ZG1zaZfV5LWri-yULiMrIkBY7T96Qno",
  authDomain: "authentication-93f21.firebaseapp.com",
  projectId: "authentication-93f21",
  storageBucket: "authentication-93f21.appspot.com",
  messagingSenderId: "13852041270",
  appId: "1:13852041270:web:b3dc4e4208d6951abfb897",
  measurementId: "G-29J36KEKEF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/utils/main.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      console.log("Form data:", formData);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        router.push("/");
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black animate__animated animate__fadeIn">
      <div className="relative w-full max-w-lg sm:max-w-lg mx-4 sm:m-4">
        <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-500 opacity-40 -skew-y-12 rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-300 to-violet-500 opacity-40 -skew-x-12 rounded-2xl"></div>
        
        <div className="w-full max-w-lg sm:max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-2xl space-y-6 relative z-10 transition-all duration-300">
          <div className="text-center space-y-2 animate__animated animate__fadeInDown">
            <div className="h-14 w-14 sm:h-16 sm:w-16 bg-black rounded-full mx-auto flex items-center justify-center">
              <span className="text-xl sm:text-2xl text-white font-bold">SR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Welcome Back</h1>
            <p className="text-gray-700">Please enter your details to sign in</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 animate__animated animate__fadeInUp">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-800">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-100 hover:bg-gray-200 ${formErrors.email ? "border-black" : ""}`}
                />
              </div>
              {formErrors.email && <div className="text-black text-sm">{formErrors.email}</div>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-800">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-100 hover:bg-gray-200 ${formErrors.password ? "border-black" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formErrors.password && <div className="text-black text-sm">{formErrors.password}</div>}
            </div>
            <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-black focus:ring-black focus:ring-2 appearance-none rounded border-gray-400 checked:bg-black checked:border-transparent"
              />
              {/* <span className="w-5 h-5 inline-block border border-gray-400 rounded transition duration-200 ease-in-out transform bg-white checked:bg-black checked:border-transparent"></span> */}
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
              <a href="#" className="text-sm text-black hover:text-gray-700 font-medium">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 animate__animated animate__fadeInUp"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Sign in"}
            </button>
          </form>
          <p className="text-black text-center mt-4 animate__animated animate__fadeInUp">
            Don't have an account?{" "}
            <Link href="/register" className="text-gray-700 hover:text-black font-medium underline">Sign up for free</Link>
          </p>
          <div className="space-y-4 animate__animated animate__fadeInUp">
            <div className="flex items-center">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="px-4 text-sm text-gray-500 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-300 transition"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-300 transition">
                <LiaApple className="w-5 h-5 mr-2" />
                Apple
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-300 transition">
                <FaGithub className="w-5 h-5 mr-2" />
                Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
