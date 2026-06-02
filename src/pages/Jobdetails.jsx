
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  const fetchSingleJob = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/createjob/${id}`
      );

      console.log(res.data);

      setJob(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleJob();
  }, []);

  if (!job) {
    return <h1>Loading...</h1>;
  }

  

  return (
    <div className="details-page">

      {/* NAVBAR */}
      <nav className="details-navbar">

        <div className="logo">
          JobPortal
        </div>

        <ul>
          <Link to="/Home">Home</Link>
          <Link to="/Joblisting">Jobs</Link>
          <Link to="/Candidatedashboard">Dashboard</Link>
        </ul>

      </nav>

      {/* HERO */}
      <section className="details-hero">

        <h1>{job.title}</h1>

        <div className="company-info">

          <span>{job.company}</span>

          <span>{job.location}</span>

          <span>{job.type}</span>

        </div>

      </section>

      {/* MAIN */}
      <section className="details-container">

        {/* LEFT */}
        <div className="left-details">

          <div className="details-card">

            <h2>Job Description</h2>

            <p>
              {job.description}
            </p>

          </div>

          <div className="details-card">

            <h2>Responsibilities</h2>

            <ul>
              <li>Develop responsive applications</li>
              <li>Integrate APIs</li>
              <li>Write clean code</li>
              <li>Work with team members</li>
            </ul>

          </div>

          <div className="details-card">

            <h2>Required Skills</h2>

            <div className="skills">

              <span>{job.skills}</span>
              
              {/* <span>JavaScript</span>
              <span>Node.js</span>
              <span>MongoDB</span> */}

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="right-details">

          <div className="apply-card">

            <h2>Job Overview</h2>

            <div className="overview-item">
              <p>Salary</p>
              <span>{job.salary}</span>
            </div>

            <div className="overview-item">
              <p>Experience</p>
              <span>1-3 Years</span>
            </div>

            <div className="overview-item">
              <p>Location</p>
              <span>{job.location}</span>
            </div>

            <div className="overview-item">
              <p>Job Type</p>
              <span>{job.type}</span>
            </div>

            <Link to={`/Applyjob/${job._id}`}>
  <button className="apply-btn">
    Apply Now
  </button>
</Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="details-footer">
        <p>
          © 2026 JobPortal. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default JobDetails;