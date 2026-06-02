

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/recruiterdashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setJobs(res.data.jobs);
      setTotalJobs(res.data.totalJobs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };


  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    await axios.delete(
      `http://localhost:5000/api/createjob/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Job Deleted Successfully");

    fetchDashboard();
  } catch (error) {
    console.log(error.response?.data);
    console.log(error);
  }
};

  return (
    <div className="recruiter-page">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>JobPortal</h2>
        </div>

        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>

          <li onClick={() => navigate("/Createjob")}>
            Post Job
          </li>

          <li onClick={() => navigate("/Applicantspage")}>
            Applicants
          </li>

          {/* <li>Profile</li> */}

          <li onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <div className="topbar">
          <div>
            <h1>Recruiter Dashboard</h1>
            <p>Manage your job postings and applicants</p>
          </div>

          <button
            className="post-job-btn"
            onClick={() => navigate("/Createjob")}
          >
            + Post New Job
          </button>
        </div>

        <div className="stats-grid">
          <div className="stats-card">
            <h2>{totalJobs}</h2>
            <p>Total Jobs Posted</p>
          </div>

          {/* <div className="stats-card">
            <h2>0</h2>
            <p>Total Applicants</p>
          </div>

          <div className="stats-card">
            <h2>0</h2>
            <p>Shortlisted</p>
          </div>

          <div className="stats-card">
            <h2>0</h2>
            <p>Closed Jobs</p>
          </div> */}
        </div>

        <div className="jobs-section">
          <div className="section-header">
            <h2>Recent Job Posts</h2>

            {/* <button>View All</button> */}
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Applicants</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id}>
                      <td>{job.title}</td>

                      <td>0</td>

                      <td>{job.location}</td>

                      <td>
                        <span className="status Active">
                          Active
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button
  className="edit-btn"
  onClick={() => navigate(`/editjob/${job._id}`)}
>
  Edit
</button>

                          <button
  className="view-btn"
  onClick={() => handleDelete(job._id)}
>
  Delete
</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center" }}
                    >
                      No jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;