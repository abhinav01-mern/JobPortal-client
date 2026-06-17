import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";



function CreateJob() {
  const navigate = useNavigate();


   const CREATE_JOB_API = `${API_URL}/api/createjob`;

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    skills: "",
    description: "",
  });

  console.log(jobData);

  const handleChange = (e) => {
    setJobData(jobData=>({
      ...jobData,
      [e.target.name]: e.target.value,
    }));
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    await axios.post(
      CREATE_JOB_API,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Job Published Successfully");

    navigate("/Recruiterdashboard");

    setJobData({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "",
      experience: "",
      skills: "",
      description: "",
    });

  } catch (error) {
    console.log("ERROR:", error.response?.data);
    console.log(error);
  }
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };


  return (
    <div className="create-job-page">

      
      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>JobPortal</h2>
        </div>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/Recruiterdashboard")}>Dashboard</li>
          <li className="active">Post Job</li>
          {/* <li>Manage Jobs</li> */}
         <li onClick={() => navigate("/Applicantspage")}>Applicants</li>
          {/* <li>Profile</li> */}
           <li onClick={handleLogout}>Logout</li>
        </ul>

      </aside>

      
      <main className="create-job-content">

        
        <div className="page-header">
          <h1>Create New Job</h1>

          <p>
            Add job details and publish opportunities
            for candidates.
          </p>
        </div>

        
        <div className="form-card">

          <form onSubmit={handleSubmit}>

            
            <div className="input-row">

              <div className="input-group">
                <label>Job Title</label>

                <input 
                type="text" 
                name="title" 
                value={jobData.title} 
                onChange={handleChange}/>
                
              </div>

              <div className="input-group">
                <label>Company Name</label>

                <input
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  onChange={handleChange}
                />
              </div>

            </div>

            
            <div className="input-row">

              <div className="input-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Salary Package</label>

                <input
                  type="text"
                  name="salary"
                  placeholder="e.g ₹8 LPA"
                  onChange={handleChange}
                />
              </div>

            </div>

            
            <div className="input-row">

              <div className="input-group">
                <label>Job Type</label>

                <select
                  name="type"
                  onChange={handleChange}
                >
                  <option>Select Job Type</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div className="input-group">
                <label>Experience</label>

                <select
                  name="experience"
                  onChange={handleChange}
                >
                  <option>Select Experience</option>
                  <option>Fresher</option>
                  <option>1 Year</option>
                  <option>2 Years</option>
                  <option>3+ Years</option>
                </select>
              </div>

            </div>

            
            <div className="input-group">
              <label>Required Skills</label>

              <input
                type="text"
                name="skills"
                placeholder="React, Node.js, MongoDB..."
                onChange={handleChange}
              />
            </div>

            
            <div className="input-group">
              <label>Job Description</label>

              <textarea
                rows="8"
                name="description"
                placeholder="Write complete job description..."
                onChange={handleChange}
              ></textarea>
            </div>

            
            <button type="submit" className="publish-btn" >
              Publish Job
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default CreateJob;