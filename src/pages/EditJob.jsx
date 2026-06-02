

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/createjob/${id}`
      );
      setJobData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/createjob/${id}`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Updated Successfully");
      navigate("/Recruiterdashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-job-page">
      <div className="edit-job-card">
        
        <button
          className="back-btn"
          onClick={() => navigate(-1)}>← Back
        </button>

        <h2>Edit Job</h2>

        <form onSubmit={handleUpdate}>
  <div className="form-group">
    <label>Job Title</label>
    <input type="text"
      name="title"
      value={jobData.title}
      onChange={handleChange}
      placeholder="Enter Job Title"
    />
  </div>

  <div className="form-group">
    <label>Company Name</label>
    <input
      type="text"
      name="company"
      value={jobData.company}
      onChange={handleChange}
      placeholder="Enter Company Name"
    />
  </div>

  <div className="form-group">
    <label>Location</label>
    <input
      type="text"
      name="location"
      value={jobData.location}
      onChange={handleChange}
      placeholder="Enter Location"
    />
  </div>

  <div className="form-group">
    <label>Salary</label>
    <input
      type="text"
      name="salary"
      value={jobData.salary}
      onChange={handleChange}
      placeholder="Enter Salary"
    />
  </div>

  <div className="form-group">
    <label>Skills</label>
    <input
      type="text"
      name="skills"
      value={jobData.skills}
      onChange={handleChange}
      placeholder="Enter Required Skills"
    />
  </div>

  <div className="form-group">
    <label>Job Description</label>
    <textarea
      name="description"
      value={jobData.description}
      onChange={handleChange}
      placeholder="Enter Job Description"
      rows="6"
    />
  </div>

  <button type="submit" className="update-btn">
    Update Job
  </button>
</form>
      </div>
    </div>
  );
}

export default EditJob;