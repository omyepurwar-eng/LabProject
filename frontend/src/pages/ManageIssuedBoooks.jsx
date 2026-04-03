import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
            const response = await axios.get('http://127.0.0.1:8000/api/admin/issued-books/');
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
     <div
  className="py-5"
  style={{ background: "linear-gradient(135deg, #f8f9fa, #e9ecef)" }}
>
  <div className="container">

    {/* Header */}
    <div className="row mb-4">
      <div className="col-md-8 mx-auto d-flex justify-content-between align-items-center">

        <div className="text-center">
          <h4 className="fw-semibold mb-1">
            <i className="bi bi-collection text-primary me-2"></i>
            Manage Issued Books
          </h4>
          <p className="text-muted small mb-0">
            View and manage issued books from here
          </p>
        </div>

        <button
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
          onClick={() => navigate("/admin/issue-book")}
        >
          <i className="bi bi-plus-circle"></i>
          Issue New Book
        </button>

      </div>
    </div>

    {/* Card */}
    <div className="card border-0 shadow-lg rounded-4">
      <div className="card-body p-4">

        {loadingList ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2"></div>
            <div className="small text-muted">Loading issued books...</div>
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-inbox fs-2 text-muted"></i>
            <p className="text-muted small mt-2 mb-0">
              No issued books found.
            </p>
          </div>
        ) : (
          <div className="table-responsive">

            <table className="table align-middle table-hover">

              {/* Table Head */}
              <thead className="small text-muted text-uppercase">
                <tr>
                  <th>#</th>
                  <th>
                    <i className="bi bi-person-badge me-1"></i>
                    Student ID
                  </th>
                  <th>
                    <i className="bi bi-person me-1"></i>
                    Student Name
                  </th>
                  <th>
                    <i className="bi bi-book me-1"></i>
                    Book Name
                  </th>
                  <th>ISBN</th>
                  <th>
                    <i className="bi bi-calendar-event me-1"></i>
                    Issued Date
                  </th>
                  <th>
                    <i className="bi bi-calendar-check me-1"></i>
                    Returned Date
                  </th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {issues.map((issue, index) => (
                  <tr key={issue.id} className="align-middle">

                    <td className="fw-semibold">{index + 1}</td>

                    <td>{issue.student_id}</td>

                    <td className="fw-medium">
                      {issue.student_name}
                    </td>

                    <td>{issue.book_title}</td>

                    <td>
                      <span className="badge bg-light text-dark border">
                        {issue.book_isbn}
                      </span>
                    </td>

                    <td>
                      {new Date(issue._issued_at).toLocaleDateString()}
                    </td>

                    <td>
                      {issue.is_returned ? (
                        <span className="badge bg-success-subtle text-success">
                          <i className="bi bi-check-circle me-1"></i>
                          {new Date(issue._returned_at).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="badge bg-warning-subtle text-warning">
                          <i className="bi bi-clock-history me-1"></i>
                          Not Returned Yet
                        </span>
                      )}
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center gap-1"
                        onClick={() =>
                          navigate(`/admin/issued-books/${issue.id}`)
                        }
                      >
                        <i className="fas fa-eye"></i>
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
</div>
  )
}

export default ManageIssuedBoooks