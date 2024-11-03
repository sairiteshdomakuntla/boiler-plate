"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { LiaApple } from "react-icons/lia";
import "animate.css";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }

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

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-black animate__animated animate__fadeIn">
      <div className="relative w-full max-w-lg mx-4 sm:m-4">
        <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-500 opacity-40 -skew-y-12 rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-300 to-violet-500 opacity-40 -skew-x-12 rounded-2xl"></div>
        
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-2xl space-y-6 relative z-10 transition-all duration-300">
          <div className="text-center space-y-2 animate__animated animate__fadeInDown">
            <div className="h-14 w-14 sm:h-16 sm:w-16 bg-black rounded-full mx-auto flex items-center justify-center">
              <span className="text-xl sm:text-2xl text-white font-bold">SR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Create Account</h1>
            <p className="text-gray-700">Please enter your details to register</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 animate__animated animate__fadeInUp">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-800">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-100 hover:bg-gray-200 ${formErrors.name ? "border-black" : ""}`}
                />
              </div>
              {formErrors.name && <div className="text-black text-sm">{formErrors.name}</div>}
            </div>
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
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-800">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-gray-100 hover:bg-gray-200 ${formErrors.confirmPassword ? "border-black" : ""}`}
                />
              </div>
              {formErrors.confirmPassword && <div className="text-black text-sm">{formErrors.confirmPassword}</div>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 animate__animated animate__fadeInUp"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Sign up"}
            </button>
          </form>
          <p className="text-black text-center mt-4 animate__animated animate__fadeInUp">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-700 hover:text-black font-medium underline">Sign in</Link>
          </p>
          {/* <div className="space-y-4 animate__animated animate__fadeInUp">
            <div className="flex items-center">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="px-4 text-sm text-gray-500 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <FcGoogle className="h-5 w-5" />
                <span className="ml-2 text-gray-800">Google</span>
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <LiaApple className="h-5 w-5" />
                <span className="ml-2 text-gray-800">Apple</span>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
