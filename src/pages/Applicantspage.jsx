import React from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Applicants() {

  

  const navigate = useNavigate();


  const [applications, setApplications] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_URL}/api/applyjob/recruiter-applicants`,
         {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
      );

      setApplications(res.data);
      setTotalJobs(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };


   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const viewResume = (resume) => {
  if (!resume) {
    alert("No resume uploaded");
    return;
  }

 window.open(resume, "_blank");
};

const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `${API_URL}/api/applyjob/status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchApplications();

  } catch (error) {
    console.log(error);
  }
};

const shortlistedCount = applications.filter(
  (item) => item.status === "Shortlisted"
).length;


const rejectedCount = applications.filter(
  (item) => item.status === "Rejected"
).length;


  return (
    <div className="applicants-page">

      
      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>JobPortal</h2>
        </div>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/Recruiterdashboard")}>Dashboard</li>
          <li onClick={() => navigate("/Createjob")}>Post Job</li>
          {/* <li>Manage Jobs</li> */}
          <li className="active">Applicants</li>
          {/* <li>Profile</li> */}
           <li onClick={handleLogout}>Logout</li>
        </ul>

      </aside>

      
      <main className="applicants-content">

        
        <div className="page-header">

          <div>
            <h1>Applicants Management</h1>

            <p>
              View and manage all job applicants
            </p>
          </div>

          {/* <button className="export-btn">
            Export Data
          </button> */}

        </div>

        
        <div className="stats-grid">

          <div className="stats-card">
            <h2>{totalJobs}</h2>
            <p>Total Applicants</p>
          </div>

          {/* <div className="stats-card">
           <h2>0</h2>
            <p>Reviewed</p>
          </div> */}

          <div className="stats-card">
             <h2>{shortlistedCount}</h2>
            <p>Shortlisted</p>
          </div>

          <div className="stats-card">
             <h2>{rejectedCount}</h2>
            <p>Rejected</p>
          </div>

        </div>

        
        <div className="table-card">

          
          <div className="table-header">

            <h2>Recent Applicants</h2>

            {/* <div className="table-actions">

              <input
                type="text"
                placeholder="Search applicants..."
              />

              <select>
                <option>Filter Status</option>
                <option>Applied</option>
                <option>Reviewed</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
              </select>

            </div> */}

          </div>

          
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Applied Role</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {applications.map((item, index) => (
                  <tr key={index}>

                    <td>{item.name}</td>

                    <td>{item.role}</td>

                    <td>{item.email}</td>

                    <td>{item.experience}</td>

                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                       <button
                    className="resume-btn"
                    onClick={() => viewResume(item.resume)}> View Resume</button>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button className="shortlist-btn" onClick={() =>
    updateStatus(item._id, "Shortlisted")
  }>
                          Shortlist
                        </button>

                        <button className="reject-btn" onClick={() =>
    updateStatus(item._id, "Rejected")
  }>
                          Reject
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Applicants;

