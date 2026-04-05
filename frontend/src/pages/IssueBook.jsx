import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const IssueBook = () => {
    const [student, setStudent] = useState(null);
    const [studentId, setStudentId] = useState('');
    const [bookQuery, setBookQuery] = useState('');
    const [book, setBook] = useState(null);
    const [studentLoading, setStudentLoading] = useState(false);
    const [bookLoading, setBookLoading] = useState(false);
    const [issueing, setIssueing] = useState(false);
    const [remark, setRemark] = useState('');

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

     useEffect(() => {
            if (!adminUser) {
                navigate('/admin/login');
            }          
        },[]);

    const handleFetchStudent = async () => {
        if (!studentId) {
            toast.error("Please enter a student ID.");
            return;
        }
        setStudent(null);
        setStudentLoading(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/students/by_id/?student_id=${studentId}`);
            setStudent(response.data.student);
        } catch (error) {
            toast.error("Student not found.");
        } finally {
            setStudentLoading(false);
        }
    };

    const handleFetchBook = async () => {
        if (!bookQuery) {
            toast.error("Please enter a book title or ISBN.");
            return;
        }
        setBook(null);
        setBookLoading(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/books/lookup/?query=${bookQuery}`);
            setBook(response.data.book);
        } catch (error) {
            toast.error("Error fetching book.");
        } finally {
            setBookLoading(false);
        }
    };

    const handleIssueBook = async () => {
        if (!student || !book || !remark) {
            toast.error("Please fill the all fields.");
            return;
        }
        if (book.quantity <= 0) {
            toast.error("No available copies of the book.");
            return;
        }   
        setIssueing(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/issue_book/`, {
                student_id: student.student_id,
                book_id: book.id,
                remarks: remark
            });
            toast.success("Book issued successfully.");

            // setBook(prev => ({
            // ...prev,
            // quantity: prev.quantity - 1   // 🔥 NEW
            // }));
            // navigate('/admin/issued-book');
            setStudent(null);
            setBook(null);
            setRemark('');
            setStudentId('');
            setBookQuery('');
        } catch (error) {
            toast.error("Error in issuing book.");
        } finally {
            setIssueing(false);
        }
    };

     const bookCoverUrl = book && book.cover_image
      ? (book.cover_image.startsWith("http")
       ? book.cover_image : `http://localhost:8000${book.cover_image}`)
        : null;

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
            <i className="bi bi-journal-plus text-primary me-2"></i>
            Issue New Books
          </h4>
          <p className="text-muted small mb-0">
            Issue new books to students from here.
          </p>
        </div>

        <button
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
          onClick={() => navigate("/admin/manage-issued-books")}
        >
          <i className="bi bi-arrow-left"></i>
          Manage Issued Books
        </button>

      </div>
    </div>

    <div className="row g-4">

      {/* LEFT FORM */}
      <div className="col-md-7">
        <div className="card shadow-lg rounded-4 border-0">
          <div className="card-body p-4">

            <form onSubmit={handleIssueBook}>

              {/* Student ID */}
              <div className="mb-4">
                <label className="form-label fw-medium small">
                  <i className="bi bi-person-badge me-1 text-primary"></i>
                  Student ID <span className="text-danger">*</span>
                </label>

                <div className="input-group shadow-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Student ID (e.g 1001)"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    onBlur={handleFetchStudent }
                    required
                  />

                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleFetchStudent}
                  >
                    {studentLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <>
                        <i className="fas fa-search me-1"></i>
                        Find
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2 small">
                  {student ? (
                    <span className="text-success fw-semibold">
                      <i className="bi bi-check-circle me-1"></i>
                      {student.full_name} ({student.email})
                    </span>
                  ) : (
                    <span className="text-muted">
                      Enter Student ID to search
                    </span>
                  )}
                </div>
              </div>

              {/* Book */}
              <div className="mb-4">
                <label className="form-label fw-medium small">
                  <i className="bi bi-book me-1 text-primary"></i>
                  ISBN No. or Book Title <span className="text-danger">*</span>
                </label>

                <div className="input-group shadow-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter ISBN or Book Title"
                    value={bookQuery}
                    onChange={(e) => setBookQuery(e.target.value)}
                    required
                  />

                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleFetchBook}
                  >
                    {bookLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <>
                        <i className="fas fa-search me-1"></i>
                        Find
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2 small">
                  {book ? (
                    <span className="text-success fw-semibold">
                      <i className="bi bi-check-circle me-1"></i>
                      {book.title} ({book.isbn})-qty: {book.quantity}
                    </span>
                  ) : (
                    <span className="text-muted">
                      No book found
                    </span>
                  )}
                </div>
              </div>

              {/* Remark */}
              <div className="mb-4">
                <label className="form-label fw-medium small">
                  <i className="bi bi-chat-left-text me-1 text-primary"></i>
                  Remark <span className="text-danger">*</span>
                </label>

                <textarea
                  className="form-control shadow-sm"
                  rows="3"
                  placeholder="e.g For 1 week, 2 weeks etc."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <button
                className="btn btn-primary mt-3 px-4 py-2 shadow-sm"
                type="submit"
                disabled={issueing}
              >
                {issueing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Issuing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-book-open me-2"></i>
                    Issue Book
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-md-5 d-flex flex-column gap-4">

        {/* Student Card */}
        <div className="card shadow-lg rounded-4 border-0">
          <div className="card-body p-4">

            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#eef2ff",
                  color: "#4f46e5"
                }}
              >
                <i className="fas fa-user-graduate fs-5"></i>
              </div>

              <div>
                <div className="small text-muted">
                  Student Information
                </div>

                <div className="fw-semibold">
                  {student ? student.full_name : "No student selected"}
                </div>

                {student && (
                  <div className="small text-muted">
                    {student.student_id} | {student.email} | {student.contact}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Book Card */}
        <div className="card shadow-lg rounded-4 border-0">
          <div className="card-body p-4">

            <div className="d-flex">
              {bookCoverUrl ? (
                <img
                  src={bookCoverUrl}
                  alt={book.title}
                  className="me-3 rounded shadow-sm"
                  style={{
                    width: "60px",
                    height: "80px",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center me-3 rounded"
                  style={{
                    width: "60px",
                    height: "80px",
                    background: "#f0f0f0"
                  }}
                >
                  <i className="fas fa-book fs-5"></i>
                </div>
              )}

              <div>
                <div className="small text-muted">
                  Book Information
                </div>

                <div className="fw-semibold">
                  {book ? book.title : "No book selected"}
                </div>

                {book && (
                  <div className="small text-muted">
                    ISBN: {book.isbn} | Qty: {book.quantity}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</div>
  )
}

export default IssueBook