import { useState } from "react";
import "./PostJob.css";
//import api from "../services/api";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    salary: "",
    job_role: "",
    country: "",
    city: "",
    job_level: "",
    description: "",
    company_name: "",
    job_type: "",
  });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const token = "8|tdP5jiVwsnLRtmY91n95Qw1iSi8ZULKvvhS25HwJd3f62015";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8002/api/create-job-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to post job");
      }
      setAlert({
        type: "success",
        message: "Job posted successfully! 🎉",
      });

      // Reset form
      setFormData({
        title: "",
        tags: "",
        salary: "",
        job_role: "",
        country: "",
        city: "",
        job_level: "",
        description: "",
      });
      console.log(response.data);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div className="post-job-page">
      {/* Post Job Form */}
      <div className="post-job-container">
        <div className="post-job-card">
          <div className="post-job-header">
            <h1>Post a job</h1>
            <p>Find the best talent for your company</p>
          </div>

          {/* Alert */}
          {alert && (
            <div className={`alert alert-${alert.type}`}>
              <span className="icon">
                {alert.type === "success" && "✅"}
                {alert.type === "error" && "❌"}
              </span>
              <span>{alert.message}</span>
              <button className="close-btn" onClick={() => setAlert(null)}>
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Job Title */}
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                placeholder="Add job title, role vacancies etc."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company_name"
                placeholder="Enter company name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tags */}
            <div className="form-row">
              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="Job keyword, tags etc.."
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Job Role</label>
                <input
                  type="text"
                  name="job_role"
                  placeholder="Enter job role"
                  value={formData.job_role}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Salary */}
            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                placeholder="Enter job salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            {/* job_level */}
          <div className="form-row">
            <div className="form-group">
              <label>Job Level</label>
              <select
                name="job_level"
                value={formData.job_level}
                onChange={handleChange}
              >
                <option value="">Select job level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* job_type */}
            <div className="form-group">
              <label>Job Type</label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
              >
                <option value="">Select job type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            </div>
            {/* Location */}
            <div className="form-group">
              <label>Location</label>
              <div className="location-group">
                <div className="location-field">
                  <span className="location-label">Country</span>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                    <option value="france">France</option>
                    <option value="india">India</option>
                    <option value="uae">UAE</option>
                    <option value="singapore">Singapore</option>
                    <option value="japan">Japan</option>
                  </select>
                </div>

                <div className="location-field">
                  <span className="location-label">City</span>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="newyork">New York</option>
                    <option value="london">London</option>
                    <option value="toronto">Toronto</option>
                    <option value="sydney">Sydney</option>
                    <option value="berlin">Berlin</option>
                    <option value="paris">Paris</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="dubai">Dubai</option>
                    <option value="singapore">Singapore</option>
                    <option value="tokyo">Tokyo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="form-group">
              <label>Job Description</label>
              <div className="description-editor">
                <div className="editor-toolbar">
                  <button type="button" className="toolbar-btn">
                    14 ▼
                  </button>
                  <button type="button" className="toolbar-btn">
                    T
                  </button>
                  <button type="button" className="toolbar-btn">
                    ⬇
                  </button>
                  <button type="button" className="toolbar-btn">
                    B
                  </button>
                  <button type="button" className="toolbar-btn">
                    I
                  </button>
                  <button type="button" className="toolbar-btn">
                    ⬇
                  </button>
                  <button type="button" className="toolbar-btn">
                    U
                  </button>
                  <button type="button" className="toolbar-btn">
                    ⬇
                  </button>
                  <button type="button" className="toolbar-btn">
                    三
                  </button>
                  <button type="button" className="toolbar-btn">
                    三
                  </button>
                  <button type="button" className="toolbar-btn">
                    三
                  </button>
                  <button type="button" className="toolbar-btn">
                    1.3
                  </button>
                  <button type="button" className="toolbar-btn">
                    三
                  </button>
                  <button type="button" className="toolbar-btn">
                    四
                  </button>
                  <button type="button" className="toolbar-btn">
                    五
                  </button>
                </div>

                <textarea
                  name="description"
                  placeholder="Add your description..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="8"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="post-job-button"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
