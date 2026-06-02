import React from "react";
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function JobListing() {

  const API_URL = "http://localhost:5000/api/createjob";

   const [jobData2, setJobData2] = useState([])

   const fetchCreatejob= async()=>{
    console.log("inside fetchuser");

    const res = await axios.get(API_URL);
     console.log(res);

        setJobData2(res.data);

    
}


    useEffect(()=>{
        fetchCreatejob();
    },[]);

     const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};


  return (
    <div className="job-page">

      
      <nav className="job-navbar">
        <div className="logo">JobPortal</div>

        <ul>
          {/* <li><a href="/Home">Home</a></li>
          <li><a href="/Joblisting">Jobs</a></li>
          <li><a href="/Candidatedashboard">Dashboard</a></li> */}

          <Link to="/Home">Home</Link>
          <Link to="/Joblisting">Jobs</Link>
          <Link to="/Candidatedashboard">Dashboard</Link>
          <li onClick={handleLogout}style={{ cursor: "pointer" }}>Logout</li>
        </ul>
      </nav>

      
      <section className="job-hero">
        <h1>Find Your Perfect Job</h1>
        <p>
          Search and apply for the latest job opportunities
          from top companies.
        </p>
      </section>

      
      {/* <section className="filter-section">

        <div className="search-input">
          <input type="text" placeholder="Search jobs..." />
        </div>

        <div className="filters">

          <select>
            <option>Location</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Bangalore</option>
          </select>

          <select>
            <option>Job Type</option>
            <option>Full Time</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>

          <select>
            <option>Salary</option>
            <option>₹5 LPA+</option>
            <option>₹10 LPA+</option>
            <option>₹15 LPA+</option>
          </select>

        </div>
      </section> */}

      
      <section className="jobs-container">

        {jobData2.map((val, ind) => (
          <div className="job-card" key={ind}>

            <div className="job-top">
              <h2>{val.title}</h2>
              <span>{val.type}</span>
            </div>

            <h3>{val.company}</h3>

            <p>
              <strong>Location:</strong> {val.location}
            </p>

            <p>
              <strong>Salary:</strong> {val.salary}
            </p>

            <div className="job-buttons">
              <Link to={`/jobdetails/${val._id}`}>
                  <button className="view-btn">
                         View Details
                      </button>
                </Link>

              <Link to={`/applyjob/${val._id}`}>
  <button className="apply-btn">
    Apply Now
  </button>
</Link>
            </div>

          </div>
        ))}

      </section>

      
      <footer className="job-footer">
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default JobListing;