import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




function Home() {

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};

   let [data1, setdata1] = useState([])
   const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");


   const API_URL = "http://localhost:5000/api/createjob";

    const fetchHome= async()=>{
    console.log("inside fetchuser");

    const res = await axios.get(API_URL);
     console.log(res);

        setdata1(res.data);
        setFilteredJobs(res.data);

    
}


    useEffect(()=>{
        fetchHome();
    },[]);




  useEffect(() => {
    const fetchHome = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.get("http://localhost:5000/api/auth/home", {
          headers: {
  Authorization: `Bearer ${token}`,
}
        });
      } catch (err) {
  navigate("/");
}
    };

    fetchHome();
  }, []);


  useEffect(() => {
  const result = data1.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase()) ||
    job.location?.toLowerCase().includes(search.toLowerCase())
  );

  setFilteredJobs(result);
}, [search, data1]);


  


  

  return (
    <div className="home-container">

      
      <nav className="navbar">
        <div className="logo">JobPortal</div>

        <ul className="nav-links">
          {/* <li><a href="/Home">Home</a></li>
          <li><a href="/Joblisting">Jobs</a></li>
          <li><a href="/Candidatedashboard">Dashboard</a></li> */}

          <Link to="/Home">Home</Link>
          <Link to="/Joblisting">Jobs</Link>
          <Link to="/Candidatedashboard">Dashboard</Link>
         <li onClick={handleLogout}style={{ cursor: "pointer" }}>Logout</li>
        </ul>
      </nav>

      
      <section className="hero-section">
        <div className="hero-left">
          <h1>
            Find Your <span>Dream Job</span> Easily
          </h1>

          <p>
            Explore thousands of job opportunities with top
            companies and build your future career today.
          </p>

         <div className="search-box">
  <div className="search-box">
  <input
    type="text"
    placeholder="Search jobs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>


</div>
        </div>

        <div className="hero-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="job"
          />
        </div>
      </section>

      
      <section className="jobs-section">
        <h2>Latest Job Openings</h2>

        <div className="job-grid">
          {filteredJobs.map((val, ind) => (
            <div className="job-card" key={ind}>
              <h3>{val.title}</h3>

              <p>
                <strong>Company:</strong> {val.company}
              </p>

              <p>
                <strong>Location:</strong> {val.location}
              </p>

              <p>
                <strong>Salary:</strong> {val.salary}
              </p>

              <Link to={`/applyjob/${val._id}`}>
  <button>Apply Now</button>
</Link>
            </div>
          ))}
        </div>
      </section>

      
      {/* <section className="features-section">
        <h2>Why Choose Us?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>1000+ Jobs</h3>
            <p>Find jobs from top companies.</p>
          </div>

          <div className="feature-card">
            <h3>Easy Apply</h3>
            <p>Apply to jobs in one click.</p>
          </div>

          <div className="feature-card">
            <h3>Trusted Recruiters</h3>
            <p>Verified recruiters and companies.</p>
          </div>
        </div>
      </section> */}

      
      <footer className="footer">
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;