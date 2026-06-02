
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
          <li onClick={() => navigate("/Candidatedashboard")}>Dashboard</li>
          <li onClick={() => navigate("/Home")}>Home</li>
          <li className="active">Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-content">

        <div className="topbar">
          <div>
            <h1>My Profile</h1>
            <p>Personal information</p>
          </div>

          <div className="profile-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
            />
          </div>
        </div>

        <div className="applications-section">
          <div className="section-header">
            <h2>Profile Details</h2>
          </div>

          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{user.name}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>

                <tr>
                  <th>Role</th>
                  <td>{user.role}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Profile;