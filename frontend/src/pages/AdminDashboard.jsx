import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
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
  className='py-5'
  style={{
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    minHeight: "100vh"
  }}
>
  <div className='container'>

    {/* HEADER */}
    <div className='row mb-5'>
      <div className='col-md-8 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3'>

        <div>
          <h4 className='fw-bold d-flex align-items-center gap-2'>
            <span
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "12px",
                background: "linear-gradient(135deg,#0d6efd,#4dabf7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 18px rgba(13,110,253,0.3)"
              }}
            >
              <i className="fa-solid fa-gauge-high text-white"></i>
            </span>
            Admin Dashboard
          </h4>

          <p className='text-muted small mb-0'>
           Quick overview of the library stats and insights.
          </p>
        </div>

        <div className='badge bg-primary-subtle bg-opacity-10 text-primary rounded-pill py-2 px-3'>
          Admin panel
        </div>

      </div>
    </div>
    {loading && (
      <div className='text-center py-5'>
        <div className='spinner-border text-primary'></div>
      </div>
    )}

    {!loading && stats && (
      <>
      <div className='row g-3 mb-4'>
        <div className='col-md-4'>
          <div className='card rounded-4 shadow-sm border-0'>
            <div className='card-body d-flex'>
              <div className='me-3 d-flex align-items-center justify-content-center'>
                <span className = "rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{
                  width : "50px",
                  height : "50px",
                  backgroundColor : "#eef2ff",
                  color : "#4dabf7",
                  boxShadow : "0 4px 12px rgba(77,171,247,0.3)"

                }}>
                  <i className="fa-solid fa-user-graduate text-primary"></i>
                </span>
              </div>
              <div >
                <p className='text-muted mb-1 text-uppercase small'>
                  Total Students
                </p>
                <h3 className='fw-semibold mb-1'>
                  {stats.total_students}
                </h3>
                <p className='text-muted mb-0 small'>
                  Active : <span className='fw-semibold text-success'>{stats.active_students}</span>
                   | Blocked : <span className='fw-semibold text-subtle'>{stats.blocked_students}</span>
                </p>

              </div>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card rounded-4 shadow-sm border-0'>
            <div className='card-body d-flex'>
              <div className='me-3 d-flex align-items-center justify-content-center'>
                <span className = "rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{
                  width : "50px",
                  height : "50px",
                  backgroundColor : "#eef2ff",
                  color : "#4dabf7",
                  boxShadow : "0 4px 12px rgba(77,171,247,0.3)"

                }}>
                  <i className="fa-solid fa-book-open text-primary"></i>
                </span>
              </div>
              <div >
                <p className='text-muted mb-1 text-uppercase small'>
                  Total Books
                </p>
                <h3 className='fw-semibold mb-1'>
                  {stats.total_books}
                </h3>
                <p className='text-muted mb-0 small'>
                  Available : <span className='fw-semibold text-success'>{stats.available_books}</span>
                   | Out Of stock : <span className='fw-semibold text-subtle'>{stats.out_of_stock_books}</span>
                </p>

              </div>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card rounded-4 shadow-sm border-0'>
            <div className='card-body d-flex'>
              <div className='me-3 d-flex align-items-center justify-content-center'>
                <span className = "rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{
                  width : "50px",
                  height : "50px",
                  backgroundColor : "#eef2ff",
                  color : "#4dabf7",
                  boxShadow : "0 4px 12px rgba(77,171,247,0.3)"

                }}>
                  <i className="fa-solid fa-arrow-right-arrow-left text-primary"></i>
                </span>
              </div>
              <div >
                <p className='text-muted mb-1 text-uppercase small'>
                  Issued records
                </p>
                <h3 className='fw-semibold mb-1'>
                  {stats.total_issued}
                </h3>
                <p className='text-muted mb-0 small'>
                  Currently issued : <span className='fw-semibold text-success'>{stats.currently_issued}</span>
                   | Returned : <span className='fw-semibold text-subtle'>{stats.returned_counts}</span>
                </p>

              </div>
            </div>
          </div>
        </div>


      </div>

      <div className='row g-3'>

        <div className='col-md-6'>
          <div className='card rounded-4 shadow-sm border-0'>
            <div className='card-body d-flex'>
              <div className='me-3 d-flex align-items-center justify-content-center'>
                <span className = "rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{
                  width : "50px",
                  height : "50px",
                  backgroundColor : "#eef2ff",
                  color : "#4dabf7",
                  boxShadow : "0 4px 12px rgba(77,171,247,0.3)"

                }}>
                  <i className="fa-solid fa-layer-group text-primary"></i>
                </span>
              </div>
              <div >
                <p className='text-muted mb-1 text-uppercase small'>
                  Categories
                </p>
                <h3 className='fw-semibold mb-1'>
                  {stats.total_categories}
                </h3>
                <p className='text-muted mb-0 small'>
                  Different categories of books available in the library.
                </p>

              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card rounded-4 shadow-sm border-0'>
            <div className='card-body d-flex'>
              <div className='me-3 d-flex align-items-center justify-content-center'>
                <span className = "rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{
                  width : "50px",
                  height : "50px",
                  backgroundColor : "#eef2ff",
                  color : "#4dabf7",
                  boxShadow : "0 4px 12px rgba(77,171,247,0.3)"

                }}>
                  <i className="fa-solid fa-user text-primary"></i>
                </span>
              </div>
              <div >
                <p className='text-muted mb-1 text-uppercase small'>
                  Authors
                </p>
                <h3 className='fw-semibold mb-1'>
                  {stats.total_authors}
                </h3>
                <p className='text-muted mb-0 small'>
                  Authors contributing to the library.
                </p>

              </div>
            </div>
          </div>
        </div>

      </div>
      </>
    )}

  </div>
</div>
  )
}

export default AdminDashboard
