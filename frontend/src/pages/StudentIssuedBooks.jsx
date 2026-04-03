import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';

const StudentIssuedBooks = () => {
    const navigate = useNavigate();
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
        if (!studentUser) {
            navigate('/student/login');
            return;
        }
         const fetchIssuedBooks = async () => {
        try{
             setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/user/issued-books/`,{
                params :{student_id : studentUser.student_id}
            });
            setIssuedBooks(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching issued books');
        } finally {
            setLoading(false);
        }
    };
    fetchIssuedBooks();
    },[]);

    const totalIssued = issuedBooks.length;
    const notReturnedCount = issuedBooks.filter(issue => !issue.is_returned).length;
    const totalFine = issuedBooks.reduce((sum, issue) => sum + (issue.fine || 0), 0);

   

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
              <i className="fas fa-receipt text-white fs-4"></i>
            </span>
            My Issued Books
          </h2>
          <p className="text-muted fs-6 mb-0">
            Welcome back, <span className="fw-semibold text-dark">{studentUser.full_name || "Guest"}</span>
          </p>
        </div>
      </div>

        {/* Loading Spinner */}
        {loading && (
            <div className = 'text-center py-5'>
                <div className = "spinner-border text-primary" role="status">
                    <span className = "visually-hidden">loading...</span>
                </div>
            </div>
            
        )}
        {!loading &&  (
            <div className='row g-4 mb-3'>
                <div className='col-md-4'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4 d-flex align-items-center justify-content-between '>
                            <div>
                                <h6 className='text-muted-uppercase small mb-1'>Total Books Issued</h6>
                            <h3 className='fw-bold'>{totalIssued}</h3>
                            </div>
                            <span className='d-inline-flex align-items-center justify-content-center rounded-4 shadow'
                            style={{
                                width:"45px",
                                height:"45px",
                                background: "linear-gradient(135deg, #0d6efd, #4dabf7)"
                            }}>
                                <i className="fas fa-book-open text-white"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4 d-flex align-items-center justify-content-between '>
                            <div>
                                <h6 className='text-muted-uppercase small mb-1'>Not Returned</h6>
                            <h3 className='fw-bold text-danger'>{notReturnedCount}</h3>
                            </div>
                            <span className='d-inline-flex align-items-center justify-content-center rounded-4 shadow'
                            style={{
                                width:"45px",
                                height:"45px",
                                background: "linear-gradient(135deg, #dc3545, #f87171)"
                            }}>
                                <i className="fas fa-arrow-left text-white"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>  
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4 d-flex align-items-center justify-content-between '>
                            <div>
                                <h6 className='text-muted-uppercase small mb-1'>Total Fine</h6>
                            <h3 className='fw-bold text-danger'>₹{totalFine}</h3>
                            </div>
                            <span className='d-inline-flex align-items-center justify-content-center rounded-4 shadow'
                            style={{
                                width:"45px",
                                height:"45px",
                                background: "linear-gradient(135deg, #dc3545, #f87171)"
                            }}>
                                <i className="fas fa-rupee-sign text-white"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {!loading && issuedBooks.length === 0 && (
            <div className='text-center py-5'>
                <h5 className='text-muted'>You have not issued any books yet.</h5>
                <button className='btn btn-outline-primary mt-3'>Browse Books</button>
            </div>
        )}

        {!loading && issuedBooks.length > 0 && (
            <div className='table-responsive'>
                <table className='table table-hover'>
                    <thead className='small text-muted'>
                        <tr>
                            <th>#</th>
                            <th>Book Title</th>
                            <th>ISBN</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuedBooks.map((issue, index) => (
                            <tr key={issue.id}>
                                <td>{index + 1}</td>
                                <td>{issue.book_title}</td>
                                <td>{issue.book_isbn}</td>
                                <td>{new Date(issue.issued_at).toLocaleDateString()}</td>
                                <td>{issue.is_returned ? new Date(issue.returned_at).toLocaleDateString() : 'Not Returned'}</td>
                                <td>
                                    {issue.status === 'returned' ? (
                                        <span className='badge bg-success'>Returned</span>
                                    ) : (
                                        <span className='badge bg-warning'>Not Returned</span>
                                    )}
                                </td>
                                <td>₹{issue.fine.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
</div>
    )
}

export default StudentIssuedBooks