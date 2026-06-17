import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


function ApplyJob() {


  const { id } = useParams();

const [job, setJob] = useState({});


useEffect(() => {
  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/createjob/${id}`
      );

      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchJob();
}, [id]);



   const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resume: ""
  });

   const handleChange = (e) => {

    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};

 const handleSubmit = async (e) => {

  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("jobId", id);

    data.append("company", job.company);
data.append("role", job.title);
data.append("location", job.location);


    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("experience", formData.experience);

    data.append("resume", formData.resume);

    const response = await axios.post(
      `${API_URL}/api/applyjob`,
      data,
      {
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Application submitted successfully!");

    navigate("/Home");

  } catch (error) {
  console.log("ERROR:", error.response?.data || error);

  alert(
    error.response?.data?.message || "Upload Failed"
  );
}
};


  return (
    <div className="apply-page">

      
      <nav className="apply-navbar">
        <div className="logo">JobPortal</div>

        <ul>
          <Link to="/Home">Home</Link>
          <Link to="/Joblisting">Jobs</Link>
          <Link to="/Candidatedashboard">Dashboard</Link>
         <li onClick={handleLogout}style={{ cursor: "pointer" }}>Logout</li>
        </ul>
      </nav>

      
      <section className="apply-hero">
        <h1>Apply For Job</h1>

        <p>
          Complete the application form and upload your
          resume to apply for this position.
        </p>
      </section>

      
      <section className="apply-container">

        
        <div className="job-info-card">

          <h2>{job.title}</h2>

          <div className="job-info">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong>{job.salary} </p>
            <p><strong>Experience:</strong>{job.experience} </p>
          </div>

        </div>

        
        <div className="apply-form-card">

          <h2>Application Form</h2>

         <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-row">

              <div className="input-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                   value={formData.phone}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="input-group">
              <label>Experience</label>

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">Select Experience</option>
                <option>Fresher</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3+ Years</option>
              </select>
            </div>

            <div className="input-group">
              <label>Upload Resume</label>

              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </div>


            <button type="submit" className="apply-btn">
              Submit Application
            </button>

          </form>

        </div>

      </section>

      
      <footer className="apply-footer">
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default ApplyJob;