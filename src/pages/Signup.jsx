import React, { useState } from "react";
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


function Signup() {

   const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
     role: "candidate"
  });

  const handleChange = (e) => {
    setFormData(formData=> ({
      ...formData,
      [e.target.name]:e.target.value
    }))
  
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      await axios.post(`${API_URL}/api/auth/register`, formData);
      alert("Registered Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
     navigate('/')
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="left-section">
          <h1>Job Portal</h1>
          <p>
            Find your dream job and connect with top recruiters.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="job"
          />
        </div>

        <div className="right-section">
          <h2>Create Account</h2>

          <form>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Select Role</label>

              <select
              name="role"
              value={formData.role}
              onChange={handleChange}>
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
              </select>
            </div>


            <button type="submit" className="signup-btn" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>

          <p className="login-link">
            Already have an account? <span><a href="/">Login</a></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;