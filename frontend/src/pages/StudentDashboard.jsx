import React , {useState,useEffect,} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [stats, setStats] = useState({
        total_books: 0,
        not_returned: 0,
        issued_books: 0,
    });
   
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));
useEffect(() => {
  if (!studentUser?.student_id) {
            toast.error("User not found. Please log in again.");
            navigate("/user/login");
            return;
        }

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API}/user_stats/`, {
                params: { student_id: studentUser.student_id }
            });
            if (response.data.success) {
                setStats(response.data.stats);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            toast.error("Failed to load dashboard stats.");
        }finally {
            setLoading(false);
        }
    };

    fetchStats();
}, [studentUser, navigate]);
return (
  <div
    className="d-flex align-items-center"
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
      paddingTop: "60px",
      paddingBottom: "60px"
    }}
  >
    <div className="container">

      {/* Header Section */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold d-flex align-items-center gap-3 mb-2">
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-4 shadow"
              style={{
                width: "55px",
                height: "55px",
                background: "linear-gradient(135deg, #0d6efd, #4dabf7)"
              }}
            >
              <i className="fas fa-user-graduate text-white fs-4"></i>
            </span>
            Dashboard
          </h2>
          <p className="text-muted fs-6 mb-0">
            Welcome back, <span className="fw-semibold text-dark">{studentUser?.full_name || "Student"}</span>
          </p>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && (
        <div className="row g-4">

          {/* Card 1 */}
          <div className="col-lg-4 col-md-6">
            <div
              className="card border-0 shadow-lg h-100 rounded-4"
              style={{ transition: "0.3s ease" }}
            >
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h6 className="text-uppercase text-muted small fw-semibold">
                      Total Books
                    </h6>
                    <h2 className="fw-bold mb-0 text-primary">
                      {stats.total_books}
                    </h2>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center shadow"
                    style={{
                      width: "55px",
                      height: "55px",
                      background: "linear-gradient(135deg, #0d6efd, #4dabf7)"
                    }}
                  >
                    <i className="fa-solid fa-book text-white fs-5"></i>
                  </div>
                </div>
                <p className="text-muted small">
                  All books currently available in your library account.
                </p>
                <Link to="/user/books" className="fw-semibold text-decoration-none text-primary">
                  View Books →
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 col-md-6">
            <div
              className="card border-0 shadow-lg h-100 rounded-4"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                transition: "0.3s ease"
              }}
            >
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h6 className="text-uppercase text-muted small fw-semibold">
                      Currently Issued
                    </h6>
                    <h2 className="fw-bold mb-0 text-primary">
                      {stats.not_returned}
                    </h2>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center shadow"
                    style={{
                      width: "55px",
                      height: "55px",
                      background: "linear-gradient(135deg, #0d6efd, #4dabf7)"
                    }}
                  >
                    <i className="fa-solid fa-clock text-white fs-5"></i>
                  </div>
                </div>
                <p className="text-muted small">
                  Books pending return. Return them on time to avoid fines.
                </p>
                <Link to="/user/books" className="fw-semibold text-decoration-none text-primary">
                  View Books →
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 col-md-6">
            <div
              className="card border-0 shadow-lg h-100 rounded-4"
              style={{ transition: "0.3s ease" }}
            >
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h6 className="text-uppercase text-muted small fw-semibold">
                      Currently Issued
                    </h6>
                    <h2 className="fw-bold mb-0 text-primary">
                      {stats.issued_books}
                    </h2>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center shadow"
                    style={{
                      width: "55px",
                      height: "55px",
                      background: "linear-gradient(135deg, #0d6efd, #4dabf7)"
                    }}
                  >
                    <i className="fa-solid fa-layer-group text-white fs-5"></i>
                  </div>
                </div>
                <p className="text-muted small">
                  Total number of books issued to your account.
                </p>
                <Link to="/user/issued-books" className="fw-semibold text-decoration-none text-primary">
                  View Issued →
                </Link>
              </div>
            </div>
          </div>
          

        </div>
      )}
    </div>
  </div>
);
}

export default StudentDashboard ;
