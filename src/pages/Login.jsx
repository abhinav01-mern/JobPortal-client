import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("abc");


   try {
      // const res = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   loginData
      // );

      // localStorage.setItem("token", `Bearer ${res.data.token}`);
      // navigate("/home");

      const res = await axios.post(
  "http://localhost:5000/api/auth/login",
  loginData
);

// localStorage.setItem("token", `Bearer ${res.data.token}`);
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

if (res.data.user.role === "admin") {
  navigate("/Superadmindashboard");

}else if (res.data.user.role === "recruiter") {
  navigate("/Recruiterdashboard");
} 

else {
  navigate("/Home");
}
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-left">
          <h1>Welcome Back</h1>

          <p>
            Login to access your dashboard, apply for jobs,
            and connect with recruiters.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="login"
          />
        </div>

        
        <div className="login-right">
          <h2>Login Account</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-box">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
              />
            </div>

            <div className="input-box">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
              />
            </div>

            {/* <div className="forgot-password">
              <span>Forgot Password?</span>
            </div> */}

            <button type="submit" className="login-btn" onClick={handleSubmit}>
              Login
            </button>

          </form>

          <p className="signup-text">
            Don't have an account? <span><a href="/Signup">Sign Up</a></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;