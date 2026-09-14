import { useState } from "react";
import "./JobSearch.css";
import { useEffect } from "react";

function JobSearch() {
  // Filters
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobLevel, setJobLevel] = useState("");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8002/api/list-job-posts")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSearch = () => {
    console.log("Search:", {
      jobTitle,
      location,
      jobLevel,
    });
  };

  const clearFilters = () => {
    setJobTitle("");
    setLocation("");
    setJobLevel("");
  };

  const handleViewDetails = (id) => {
    setDetailsLoading(true);

    fetch(`http://127.0.0.1:8002/api/view-job-details/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Job details:", data);
        setSelectedJob(data);
        setDetailsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setDetailsLoading(false);
      });
  };
  //const handleApply = (id) => {

  return (
    <div className="job-search-page">
      {/* Header */}
      <div className="job-search-header">
        <h1>Job Search</h1>
        <p>Search for your desired job matching your skills</p>
      </div>

      {/* Filters */}
      <div className="job-filters">
        <div className="filter-input">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Enter Job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div className="filter-input">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="filter-input">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Enter Job Level"
            value={jobLevel}
            onChange={(e) => setJobLevel(e.target.value)}
          />
        </div>

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Jobs Header */}
      <div className="jobs-header">
        <div className="jobs-title">
          <button className="clear-button" onClick={clearFilters}>
            Clear all
          </button>
          <h2>All Jobs ({jobs.length})</h2>
        </div>
      </div>

      {/* Jobs Cards */}
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <div className="job-card-top">
              <h3>{job.title}</h3>
              <button className="bookmark-button">♡</button>
            </div>

            <div className="job-meta">
              <span className="job-type">{job.job_type}</span>
              <span className="salary">Salary: {job.salary}</span>
            </div>

            <div className="company-name">{job.company_name} company</div>

            <div className="job-location">
              <span className="location-icon">📍</span>
              <span>
                {job.city}, {job.country}
              </span>
            </div>

            <div className="job-actions">
              <button
                className="details-button"
                onClick={() => handleViewDetails(job.id)}
              >
                View details
              </button>
              <button className="apply-button">Apply now</button>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="view-more-container">
        <span className="down-arrow">⌄</span>
        <button className="view-more-button">View more</button>
      </div>

      {/* Modal Popup */}
      {selectedJob && (
        <div className="modal-overlay">
          <div className="job-modal">
            <button
              className="close-modal"
              onClick={() => setSelectedJob(null)}
            >
              ×
            </button>

            {detailsLoading ? (
              <p>Loading job details...</p>
            ) : (
              <>
                <h2>{selectedJob.title}</h2>
                <p className="modal-company">
                  {selectedJob.company_name} company
                </p>
                <p>📍 {selectedJob.city}, {selectedJob.country}</p>
                <p><strong>Job Type:</strong> {selectedJob.job_type}</p>
                <p><strong>Salary:</strong> {selectedJob.salary}</p>
                <p><strong>Job Level:</strong> {selectedJob.job_level}</p>
                <h3>Job Description</h3>
                <p>{selectedJob.description}</p>
                <button className="apply-button">Apply now</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobSearch;