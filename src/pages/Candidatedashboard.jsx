import React from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const navigate = useNavigate();


  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_URL}/api/applyjob`,
         {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  }
      );
      console.log(res.data);

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };



   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  

  

  return (
    <div className="dashboard-page">

      
      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>JobPortal</h2>
        </div>

        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li onClick={() => navigate("/Home")}>Home</li>

         <li onClick={() => navigate("/Profile")}>Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>

      </aside>

      
      <main className="dashboard-content">

        
        <div className="topbar">

          <div>
            <h1>Candidate Dashboard</h1>
            
          </div>

          <div className="profile-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
            />
          </div>

        </div>

        
        {/* <div className="stats-grid">

          <div className="stats-card">
            <h2>12</h2>
            <p>Applied Jobs</p>
          </div>

          <div className="stats-card">
            <h2>5</h2>
            <p>Reviewed</p>
          </div>

          <div className="stats-card">
            <h2>3</h2>
            <p>Shortlisted</p>
          </div>

          <div className="stats-card">
            <h2>2</h2>
            <p>Rejected</p>
          </div>

        </div> */}

        
        <div className="applications-section">

          <div className="section-header">
            <h2>Recent Applications</h2>

            {/* <button>View All</button> */}
          </div>

          
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {applications.map((item, index) => (
                  <tr key={index}>

                    <td>{item.company}</td>
                    <td>{item.role}</td>
                    <td>{item.location}</td>

                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status}
                      </span>
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

export default CandidateDashboard;



