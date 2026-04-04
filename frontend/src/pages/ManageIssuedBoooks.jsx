import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

  .mi-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a3a8f, #3b82f6, #93c5fd);
    font-family: 'Nunito', sans-serif;
    padding: 32px 16px;
  }

  .mi-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Header */
  .mi-header {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(16px);
    border-radius: 18px;
    padding: 20px 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    border: 1px solid rgba(255,255,255,0.25);
  }

  .mi-title {
    color: #fff;
    font-weight: 800;
    font-size: 1.3rem;
  }

  .mi-sub {
    color: rgba(255,255,255,0.7);
    font-size: 0.8rem;
  }

  .mi-btn {
    background: #fff;
    color: #1a3a8f;
    border: none;
    padding: 9px 18px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    gap: 6px;
    align-items: center;
    transition: 0.2s;
  }

  .mi-btn:hover {
    transform: translateY(-2px);
  }

  /* Card */
  .mi-card {
    background: rgba(255,255,255,0.13);
    backdrop-filter: blur(18px);
    border-radius: 20px;
    padding: 22px;
    border: 1px solid rgba(255,255,255,0.25);
  }

  /* Table */
  .mi-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }

  .mi-table th {
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
    font-size: 0.7rem;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }

  .mi-table td {
    color: #fff;
    padding: 12px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .mi-table tr:hover {
    background: rgba(255,255,255,0.08);
  }

  /* Badges */
  .mi-badge {
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .mi-success {
    background: rgba(80,220,130,0.2);
    color: #7fffb8;
  }

  .mi-warning {
    background: rgba(255,200,80,0.2);
    color: #ffd27f;
  }

  .mi-isbn {
    background: rgba(255,255,255,0.15);
    padding: 4px 10px;
    border-radius: 8px;
    font-family: monospace;
  }

  /* Action Button */
  .mi-action {
    background: rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.3);
    color: #fff;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    transition: 0.2s;
  }

  .mi-action:hover {
    background: rgba(255,255,255,0.3);
  }

  /* Spinner */
  .mi-spinner {
    width: 34px;
    height: 34px;
    border: 3px solid rgba(255,255,255,0.3);
    border-top: 3px solid #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin: auto;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .mi-center {
    text-align: center;
    padding: 30px 0;
    color: rgba(255,255,255,0.7);
  }
`;

const ManageIssuedBoooks = () => {
    
    const [issues, setIssues] = useState([]);
    const [loadingList, setLoadingList] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        fetchIssues();
    },[]);

    const fetchIssues = async () => {
        setLoadingList(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/admin/issued-books/`);
            setIssues(response.data);  
        }
        catch(err){
            console.error(err);
            toast.error("Failed to load issued books.");
        }
        finally{
            setLoadingList(false);
        }
    }

  return (
    <>
      <style>{styles}</style>

      <div className="mi-page">
        <div className="mi-container">

          {/* Header */}
          <div className="mi-header">
            <div>
              <div className="mi-title">
                <i className="fa-solid fa-book-open" style={{marginRight:8}}></i>
                Manage Issued Books
              </div>
              <div className="mi-sub">
                View and manage issued books
              </div>
            </div>

            <button
              className="mi-btn"
              onClick={() => navigate("/admin/issue-book")}
            >
              <i className="fa-solid fa-plus"></i>
              Issue Book
            </button>
          </div>

          {/* Card */}
          <div className="mi-card">

            {loadingList ? (
              <div className="mi-center">
                <div className="mi-spinner"></div>
                <div style={{marginTop:10}}>Loading issued books...</div>
              </div>
            ) : issues.length === 0 ? (
              <div className="mi-center">
                <i className="fa-regular fa-folder-open" style={{fontSize:'2rem'}}></i>
                <div>No issued books found</div>
              </div>
            ) : (
              <div style={{overflowX:'auto'}}>
                <table className="mi-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student ID</th>
                      <th>Student</th>
                      <th>Book</th>
                      <th>ISBN</th>
                      <th>Issued</th>
                      <th>Returned</th>
                      <th style={{textAlign:'center'}}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {issues.map((issue, index) => (
                      <tr key={issue.id}>
                        <td>{index + 1}</td>
                        <td>{issue.student_id}</td>
                        <td>{issue.student_name}</td>
                        <td>{issue.book_title}</td>

                        <td>
                          <span className="mi-isbn">
                            {issue.book_isbn}
                          </span>
                        </td>

                        <td>
                          {new Date(issue._issued_at).toLocaleDateString()}
                        </td>

                        <td>
                          {issue.is_returned ? (
                            <span className="mi-badge mi-success">
                              {new Date(issue._returned_at).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="mi-badge mi-warning">
                              Not Returned
                            </span>
                          )}
                        </td>

                        <td style={{textAlign:'center'}}>
                          <button
                            className="mi-action"
                            onClick={() =>
                              navigate(`/admin/issued-books/${issue.id}`)
                            }
                          >
                            <i className="fa-solid fa-eye" style={{marginRight:5}}></i>
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  )
}

export default ManageIssuedBoooks;