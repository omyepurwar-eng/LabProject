import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate , useParams } from 'react-router-dom';

const IssuedBookDetails =  () => {
    const {id} = useParams();
     const [issue, setIssue] = useState(null);
     const [fine, setFine] = useState(0);
     const [loading, setLoading] = useState(false);
     const [returning, setReturning] = useState(false); 

  
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        
        fetchDetails();
        
    },[]);

    const fetchDetails = async () => {
        setLoading(true);
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/issued-books/${id}/`);
            setIssue(response.data);
            if (response.data.fine){
                setFine(response.data.fine);
            }  
        }
        catch(err){
            console.error(err);
            toast.error("Failed to load issued book details.");
        }
        finally{
            setLoading(false);
        }
    }
    const handleReturn= async () => {
        if (!window.confirm("Are you sure you want to return this book?")){ 
            return;
        }
        setReturning(true);
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/admin/return_book/${id}/`,{fine: fine});
            toast.success("Book returned successfully.");
            // navigate("/admin/manage-issued-books");
            fetchDetails();
        }
        catch(err){
            console.error(err);
            toast.error("Failed to return the book.");
        }
        finally{
            
        } 

    }

        const bookCoverUrl = issue &&  issue.book_cover
      ? (issue.book_cover.startsWith("http")
       ? issue.book_cover : `http://localhost:8000${issue.book_cover}`)
        : null;

    if(loading || !issue){
        // if(loading){
        return (
            <div className='py-5 d-flex justify-content-center align-items-center'
            style={{background:"linear-gradient(135deg, #f8f9fa, #e9ecef)",minHeight:"80vh"}}>
                
                <div className='spinner-border text-primary'></div>

            </div>
        )
        
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
              <i className="fa-solid fa-book-open text-white"></i>
            </span>
            Issued Book Details
          </h4>

          <p className='text-muted small mb-0'>
            View student and issued book information
          </p>
        </div>

        <button
          className='btn btn-outline-primary'
          onClick={() => navigate("/admin/manage-issued-books")}
          style={{
            borderRadius: "10px",
            padding: "6px 16px"
          }}
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back to List
        </button>

      </div>
    </div>

    <div className='row g-4'>

      {/* STUDENT CARD */}
      <div className='col-md-6'>
        <div
          className='card border-0'
          style={{
            borderRadius: "18px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
          }}
        >
          <div className='card-body p-4'>
            <h5 className='fw-semibold mb-3 d-flex align-items-center gap-2'>
              <i className="fa-solid fa-user text-primary"></i>
              Student Details
            </h5>
            <hr />

            <p className='mb-2'>
              <i className="fa-solid fa-id-card me-2 text-muted"></i>
              <strong>Student ID:</strong> {issue.student_id}
            </p>

            <p className='mb-2'>
              <i className="fa-solid fa-user me-2 text-muted"></i>
              <strong>Name:</strong> {issue.student_name}
            </p>

            <p className='mb-1'>
              <i className="fa-solid fa-indian-rupee-sign me-2 text-muted"></i>
              <strong>Fine:</strong>
              {issue?.fine ? ` ₹ ${issue.fine}` : " No fine recorded yet."}
            </p>
          </div>
        </div>
      </div>

      {/* BOOK DETAILS */}
      <div className='col-md-6'>
        <div
          className='card border-0 mb-4'
          style={{
            borderRadius: "18px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
          }}
        >
          <div className='card-body p-4'>
            <h5 className='fw-semibold mb-3 d-flex align-items-center gap-2'>
              <i className="fa-solid fa-book text-primary"></i>
              Book Details
            </h5>
            <hr />

            {bookCoverUrl && (
              <div className='text-center mb-4'>
                <img
                  src={bookCoverUrl}
                  alt={issue.book_title}
                  style={{
                    maxHeight: "200px",
                    maxWidth: "150px",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                  }}
                />
              </div>
            )}

            <p className='mb-2'>
              <i className="fa-solid fa-book-open me-2 text-muted"></i>
              <strong>Title:</strong> {issue.book_title}
            </p>

            <p className='mb-2'>
              <i className="fa-solid fa-barcode me-2 text-muted"></i>
              <strong>ISBN:</strong> {issue.book_isbn}
            </p>

            <p className='mb-2'>
              <i className="fa-solid fa-calendar-days me-2 text-muted"></i>
              <strong>Issued Date:</strong>{" "}
              {new Date(issue.issued_at).toLocaleDateString()}
            </p>

            <p className='mb-1'>
              <i className="fa-solid fa-clock me-2 text-muted"></i>
              <strong>Return Date:</strong>{" "}
              {issue.return_date
                ? new Date(issue.return_date).toLocaleDateString()
                : "Not returned yet"}
            </p>
          </div>
        </div>

        {/* RETURN CARD */}
        <div
          className='card border-0'
          style={{
            borderRadius: "18px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
          }}
        >
          <div className='card-body p-4'>
            <h5 className='fw-semibold mb-3 d-flex align-items-center gap-2'>
              <i className="fa-solid fa-rotate-left text-primary"></i>
              Return Book
            </h5>
            <hr />

            {issue.is_returned ? (
              <p className="mb-0">
                <i className="fa-solid fa-circle-check text-success me-2"></i>
                Returned on{" "}
                {new Date(issue.returned_at).toLocaleDateString()}
                <br />
                Fine: <strong>₹{issue.fine || 0}</strong>
              </p>
            ) : (
              <>
                <div className='mb-3'>
                  <label className="form-label fw-semibold">
                    <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                    Fine Amount
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    value={fine}
                    onChange={(e) => setFine(e.target.value)}
                    placeholder="Enter fine amount if applicable"
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                    }}
                  />
                </div>

                <button
                  className='btn btn-primary w-100'
                  onClick={handleReturn}
                  disabled={issue.is_returned || returning}
                  style={{
                    borderRadius: "12px",
                    height: "48px",
                    fontWeight: "600",
                    boxShadow: "0 10px 25px rgba(13,110,253,0.35)"
                  }}
                >
                  {issue.is_returned
                    ? "Book Returned"
                    : returning
                    ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    )
                    : (
                      <>
                        <i className="fa-solid fa-rotate-left me-2"></i>
                        Return Book
                      </>
                    )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
  )
}

export default IssuedBookDetails