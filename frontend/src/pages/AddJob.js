import React, { useState } from "react";
import axios from "axios";

function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/jobs", formData);
      alert("✅ Job added successfully!");
      console.log(res.data);

      // Clear form after submission
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding job:", error);
      alert("❌ Failed to add job. Please check your backend server.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="salary"
          placeholder="Salary (optional)"
          value={formData.salary}
          onChange={handleChange}
        />
        <br /><br />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
