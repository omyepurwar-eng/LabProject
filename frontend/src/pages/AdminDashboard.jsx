import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const adminUser = localStorage.getItem("adminUser");
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
            return;
        }
         fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try{
            const response = await axios.get('http://localhost:8000/api/admin/dashboard-stats/');
            setStats(response.data);
        }
        catch(err){
            console.error(err);
            toast.error("Failed to load dashboard stats.");
        }
        finally{
            setLoading(false);
        }
    }

return (
<div
  className="py-5"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3a8a, #3b82f6, #93c5fd)"
  }}
>
  <div className="container">

    {/* HEADER */}
    <div className="text-center mb-5">
      <div
        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >
        <i className="fas fa-gauge-high text-white fs-3"></i>
      </div>

      <h2 className="fw-bold text-white">Admin Dashboard</h2>
      <p className="text-light">Overview of your library system</p>
    </div>

    {/* LOADING */}
    {loading && (
      <div className="text-center py-5">
        <div className="spinner-border text-light"></div>
      </div>
    )}

    {/* STATS */}
    {!loading && stats && (
      <>
        <div className="row g-4 mb-4">

          {/* STUDENTS */}
          <div className="col-md-4">
            <div style={cardStyle}>
              <div className="d-flex">
                <div style={iconBox}>
                  <i className="fas fa-user-graduate text-white"></i>
                </div>
                <div>
                  <p className="text-light small mb-1">Total Students</p>
                  <h3 className="text-white">{stats.total_students}</h3>
                  <p className="text-light small mb-0">
                    Active: <span className="text-success fw-bold">{stats.active_students}</span> | 
                    Blocked: <span className="text-warning fw-bold">{stats.blocked_students}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOOKS */}
          <div className="col-md-4">
            <div style={cardStyle}>
              <div className="d-flex">
                <div style={iconBox}>
                  <i className="fas fa-book text-white"></i>
                </div>
                <div>
                  <p className="text-light small mb-1">Total Books</p>
                  <h3 className="text-white">{stats.total_books}</h3>
                  <p className="text-light small mb-0">
                    Available: <span className="text-success fw-bold">{stats.available_books}</span> | 
                    Out: <span className="text-warning fw-bold">{stats.out_of_stock_books}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ISSUED */}
          <div className="col-md-4">
            <div style={cardStyle}>
              <div className="d-flex">
                <div style={iconBox}>
                  <i className="fas fa-exchange-alt text-white"></i>
                </div>
                <div>
                  <p className="text-light small mb-1">Issued Records</p>
                  <h3 className="text-white">{stats.total_issued}</h3>
                  <p className="text-light small mb-0">
                    Current: <span className="text-success fw-bold">{stats.currently_issued}</span> | 
                    Returned: <span className="text-warning fw-bold">{stats.returned_counts}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row g-4">

          {/* CATEGORIES */}
          <div className="col-md-6">
            <div style={cardStyle}>
              <div className="d-flex">
                <div style={iconBox}>
                  <i className="fas fa-layer-group text-white"></i>
                </div>
                <div>
                  <p className="text-light small mb-1">Categories</p>
                  <h3 className="text-white">{stats.total_categories}</h3>
                  <p className="text-light small">Book categories available</p>
                </div>
              </div>
            </div>
          </div>

          {/* AUTHORS */}
          <div className="col-md-6">
            <div style={cardStyle}>
              <div className="d-flex">
                <div style={iconBox}>
                  <i className="fas fa-user-pen text-white"></i>
                </div>
                <div>
                  <p className="text-light small mb-1">Authors</p>
                  <h3 className="text-white">{stats.total_authors}</h3>
                  <p className="text-light small">Contributing authors</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </>
    )}

  </div>
</div>
);
}

// 🔥 Glass Card Style
const cardStyle = {
  borderRadius: "20px",
  padding: "20px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
};

// 🔥 Icon Box
const iconBox = {
  width: "55px",
  height: "55px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "15px"
};

export default AdminDashboard;