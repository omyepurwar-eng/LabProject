import React , {useState,useEffect,} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

const StudentBooks = () => {
    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));
useEffect(() => {
        if (!studentUser) {
            navigate("/user/login");
            return;
        }   
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API}/user/books/`);
             
            setBooks(response.data)
            setFiltered(response.data)
        }catch (err) {
            console.error(err);
            toast.error("Failed to fetch books .");
            setBooks
        }finally {
            setLoading(false);
        }
    };

    fetchBooks();
}, []);

    useEffect(() => {
        const term = search.trim().toLowerCase();
        if(!term){
            setFiltered(books);
            return;
        }
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(term) ||
            book.author_name.toLowerCase().includes(term) ||
            book.isbn.toLowerCase().includes(term)
        );
        setFiltered(filteredBooks);
    }, [search, books]);

    const getCoverUrl = (book) => {
      if (!book.cover_image) {
        return null;
      }
        if (book.cover_image.startsWith("http://")) {
            return book.cover_image;
        }
        return `${import.meta.env.VITE_API}${book.cover_image}`;
    };

  return (
    <div
  className="d-flex align-items-center"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe, #f8fafc)",
    paddingTop: "90px",
    paddingBottom: "90px"
  }}
>
  <div className="container">

    {/* Header Section */}
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-5">
      <div>
        <h3 className="fw-bold d-flex align-items-center gap-3 mb-2">
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-4 shadow-sm"
            style={{
              width: "50px",
              height: "50px",
              background: "linear-gradient(135deg, #0d6efd, #4dabf7)"
            }}
          >
            <i className="fas fa-book text-white fs-5"></i>
          </span>
          Available Books
        </h3>
        <p className="text-muted fw-semibold mb-0">
          Explore the collection of knowledge available for growing your mind.
        </p>
      </div>

      <div className="mt-3">
  <div
    className="input-group"
    style={{
      borderRadius: "14px",
      overflow: "hidden",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      background: "#ffffff"
    }}
  >
    <span
      className="input-group-text border-0"
      style={{
        background: "transparent",
        paddingLeft: "14px",
        paddingRight: "10px"
      }}
    >
      <i
        className="fas fa-search"
        style={{
          color: "#0d6efd",
          fontSize: "16px"
        }}
      ></i>
    </span>

    <input
      type="text"
      className="form-control border-0"
      placeholder="Search by title, author, or ISBN"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "270px",
        height: "46px",
        fontSize: "14px",
        padding: "0 12px",
        outline: "none",
        boxShadow: "none",
        background: "transparent"
      }}
    />
  </div>
</div>
    </div>

    {/* Loading Spinner */}
    {loading && (
      <div className="text-center my-5 py-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )}

    {!loading && filtered.length === 0 && (
      <div className="text-center my-5 py-5">
        <i className="fa-solid fa-book-open-reader text-muted fa-3x"></i>
        <p className="mt-3 text-muted fw-semibold">
          No books available matching your search criteria.
        </p>
      </div>
    )}

    {!loading && filtered.length > 0 && (
      <div className="row g-4">
        {filtered.map((book) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={book.id}>
            <div
              className="card border-0 shadow-sm h-100 rounded-4"
              style={{
                transition: "all 0.25s ease",
                paddingBottom: "10px"
              }}
            >
              <div
                className="overflow-hidden d-flex align-items-center justify-content-center bg-light rounded-top-4"
                style={{
                  height: "260px",
                  padding: "15px"
                }}
              >
                {getCoverUrl(book) ? (
                  <img
                    src={getCoverUrl(book)}
                    className=""
                    alt={book.title}
                    style={{
                      height: "230px",
                      objectFit: "contain",
                      transition: "transform 0.3s ease"
                    }}
                  />
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                    <i className="fas fa-book fa-3x mb-3"></i>
                    <span className="small fw-semibold">
                      No Cover Image
                    </span>
                  </div>
                )}
              </div>

              <div className="card-body d-flex flex-column pt-3">
                <h6 className="card-title text-truncate fw-bold mb-2">
                  {book.title}
                </h6>

                <p className="card-text text-truncate text-muted mb-1 small">
                  <i className="fas fa-user-pen me-2 text-primary"></i>
                  {book.author_name}
                </p>

                <p className="small text-muted mb-2">
                  <span className="badge text-primary border border-primary-subtle px-3 py-2">
                    <i className="fas fa-tag me-1"></i>
                    {book.category_name}
                  </span>
                </p>

                <p className="card-text text-truncate text-muted small mb-2">
                  ISBN: {book.isbn}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="fw-bold text-success fs-6">
                    ₹ {book.price}
                  </span>

                  <span
                    className={`badge px-3 py-2 rounded-pill
                    ${
                      book.available_quantity > 0
                        ? "bg-success-subtle text-success border border-success-subtle"
                        : "bg-danger-subtle text-danger border border-danger-subtle"
                    }`}
                  >
                    {book.available_quantity > 0
                      ? `Available (${book.available_quantity})`
                      : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  )
}

export default StudentBooks