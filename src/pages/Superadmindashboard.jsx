import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
  fetchRecruiters();
}, []);

const fetchRecruiters = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${API_URL}/api/admin/recruiters`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecruiters(res.data);

  } catch (error) {
    console.log(error);
  }
};

const approveRecruiter = async (id) => {

  const token = localStorage.getItem("token");

  await axios.put(
    `${API_URL}/api/admin/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchRecruiters();
};

const rejectRecruiter = async (id) => {

  const token = localStorage.getItem("token");

  await axios.put(
    `${API_URL}/api/admin/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchRecruiters();
};

const deleteRecruiter = async (id) => {

  const token = localStorage.getItem("token");

  await axios.delete(
    `${API_URL}/api/admin/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchRecruiters();
};


   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-page">

      
      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>JobPortal</h2>
        </div>

        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
         <li onClick={handleLogout}>Logout</li>
        </ul>

      </aside>

      
      <main className="admin-content">

        
        <div className="page-header">

          <div>
            <h1>Super Admin Dashboard</h1>

            <p>
              Manage recruiters
            </p>
          </div>


        </div>

        
        <div className="stats-grid">

          <div className="stats-card">
            <h2>{recruiters.length}</h2>
            <p>Total Recruiters</p>
          </div>

          {/* <div className="stats-card">
            <h2>450</h2>
            <p>Total Users</p>
          </div>

          <div className="stats-card">
            <h2>210</h2>
            <p>Active Jobs</p>
          </div>

          <div className="stats-card">
            <h2>35</h2>
            <p>Pending Approvals</p>
          </div> */}

        </div>

        
        <div className="table-card">

          
          <div className="table-header">

            <h2>Recruiter Management</h2>

            <div className="table-actions">

              {/* <input
                type="text"
                placeholder="Search recruiters..."
              /> */}

              {/* <select>
                <option>Filter Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select> */}

            </div>

          </div>

          
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Company</th>
                  <th>Recruiter</th>
                  <th>Email</th>
                  <th>Jobs Posted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {recruiters.map((item, index) => (
                  <tr key={index}>

                    <td>{item.company}</td>

                    <td>{item.recruiter}</td>

                    <td>{item.email}</td>

                    <td>{item.jobs}</td>

                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button className="approve-btn" onClick={() => approveRecruiter(item._id)}>
                          Approve
                        </button>

                        <button className="reject-btn" onClick={() =>rejectRecruiter(item._id)}>
                          Reject
                        </button>

                        <button className="delete-btn" onClick={() => deleteRecruiter(item._id)}>
                          Delete
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

export default SuperAdminDashboard;