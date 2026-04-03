import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    
    const [editPrice, setEditPrice] = useState('');
    const [editQuantity, setEditQuantity] = useState('');

    const [editImageFile, setEditImageFile] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);

    const [loadingList, setLoadingList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        else{
            fetchAll();
        }
    },[]);

    const fetchAll = async () => {
        setLoadingList(true);
        try{
            const [booksResp, categoriesResp,authorsResp] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/books/'),
                axios.get('http://127.0.0.1:8000/api/categories/'),
                axios.get('http://127.0.0.1:8000/api/authors/')
            ]);
            setBooks(booksResp.data);
            setCategories(categoriesResp.data);
            setAuthors(authorsResp.data);
        }
        catch(err){
            console.error(err);
            toast.error("Failed to load data.");
        }
        finally{
            setLoadingList(false);
        }
    }
    const startEdit = (book) => {
        setEditId(book.id);
        setEditTitle(book.title);
        setEditCategory(book.category);
        setEditAuthor(book.author);
        setEditPrice(book.price);
        setEditQuantity(book.quantity);
        setEditImagePreview(`http://127.0.0.1:8000${book.cover_image}`);
        setEditImageFile(null);

    }
    const cancelEdit = () => {
        setEditId(null);
        setEditTitle("");
        setEditCategory("");
        setEditAuthor("");
        setEditPrice("");
        setEditQuantity("");
        setEditImagePreview(null);
        setEditImageFile(null);

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditImageFile(file);
            setEditImagePreview(URL.createObjectURL(file));
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('category', editCategory);
            formData.append('author', editAuthor);
            formData.append('price', editPrice);
            formData.append('quantity', editQuantity);
            if (editImageFile) {
                formData.append('cover_image', editImageFile);
            }
            const response = await axios.put(`http://127.0.0.1:8000/api/update_book/${editId}/`,
                 formData,
                 {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if(response.data.success){
                    toast.success(response.data.message || 'Book Updated.');
                    cancelEdit();
                    fetchAll();
                }
            else{
                toast.error(response.data.message || 'Failed to update book.');
            }
            }
        catch (err) {
            console.error(err);

            toast.error("Failed to update book.");
                    }
    
        finally {
                setSaving(false);
                }
    }

    const handleDelete = async (id) => {
        // 1. Confirm with the user first
    const ok = window.confirm("Are you sure you want to delete this book? This action cannot be undone.");

       if (!ok) return;
            try {
                // 2. Call the API
                // I am assuming the endpoint structure matches your Update URL
                const response = await axios.delete(`http://127.0.0.1:8000/api/delete_book/${id}/`);

                // 3. Handle success
                // Adjust this condition based on your exact API response structure
                if (response.data.success){
                    toast.success(response.data.message || "Book deleted successfully.");
                    setBooks((prev)=> prev.filter((book) => book.id !== id));
                    if (editId === id) {
                        cancelEdit();
                    }

                }
                 else {
                    toast.error(response.data.message || "Failed to delete book.");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error occurred while deleting.");
            }
        
    }
  return (
  <div
    className="py-5 d-flex align-items-start"
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2f7, #f8f9fa)"
    }}
  >
    <div className="container">

      {/* Header */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto d-flex justify-content-between align-items-center bg-white shadow-sm rounded-4 p-4">
          
          <div>
            <h4 className="fw-bold mb-1 text-dark">
              <i className="fa-solid fa-layer-group me-2 text-primary"></i>
              Manage Books
            </h4>
            <p className="text-muted small mb-0">
              View, edit and manage your books inventory
            </p>
          </div>

          <button
            className="btn btn-primary rounded-3 shadow-sm fw-semibold"
            onClick={() => navigate("/admin/book/add")}
          >
            <i className="fa-solid fa-plus me-2"></i>
            Add New Book
          </button>

        </div>
      </div>

      <div className="row g-4">

        {/* Edit Section */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 h-100">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-4 text-primary">
                <i className="fa-solid fa-pen-to-square me-2"></i>
                {editId ? "Edit Book" : "Select Book to Edit"}
              </h6>

              {editId ? (
                <form onSubmit={handleUpdate}>
                  <div className="row g-3">

                    <div className="col-12">
                      <label className="form-label fw-semibold small">
                        Book Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3 shadow-sm"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small">
                        Category
                      </label>
                      <select
                        className="form-select rounded-3 shadow-sm"
                        required
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small">
                        Author
                      </label>
                      <select
                        className="form-select rounded-3 shadow-sm"
                        required
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}
                      >
                        <option value="">Select Author</option>
                        {authors.map((auth) => (
                          <option key={auth.id} value={auth.id}>
                            {auth.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="form-label fw-semibold small">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control rounded-3 shadow-sm"
                        required
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label fw-semibold small">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control rounded-3 shadow-sm"
                        required
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small">
                        Book Cover
                      </label>

                      {editImagePreview && (
                        <div className="mb-3 text-center">
                          <img
                            src={editImagePreview}
                            alt="Preview"
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ maxHeight: "140px" }}
                          />
                        </div>
                      )}

                      <input
                        type="file"
                        className="form-control rounded-3 shadow-sm"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-3 shadow-sm fw-semibold"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-floppy-disk me-2"></i>
                          Update
                        </>
                      )}
                    </button>

                    <button
                      className="btn btn-outline-secondary w-100 rounded-3 fw-semibold"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-muted small">
                  Click on <strong>Edit</strong> to modify book details.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4">

              <h6 className="fw-bold mb-4 text-primary">
                <i className="fa-solid fa-book me-2"></i>
                List of Books
              </h6>

              {loadingList ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                </div>
              ) : books.length === 0 ? (
                <p className="text-muted small">
                  No books found. Try adding a new book.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="small text-muted">
                      <tr>
                        <th>#</th>
                        <th>Book</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book, index) => (
                        <tr key={book.id}>
                          <td>{index + 1}</td>

                          <td style={{ maxWidth: "250px" }}>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={`http://127.0.0.1:8000${book.cover_image}`}
                                alt={book.title}
                                className="rounded-3 shadow-sm"
                                style={{ height: "70px", width: "60px", objectFit: "cover" }}
                              />
                              <span className="fw-semibold">
                                {book.title}
                              </span>
                            </div>
                          </td>

                          <td className="text-muted">{book.category_name}</td>
                          <td className="text-muted">{book.author_name}</td>
                          <td className="text-muted">{book.isbn}</td>
                          <td className="text-muted">${book.price}</td>
                          <td className="text-muted">{book.quantity}</td>

                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-primary rounded-3 me-2"
                              onClick={() => startEdit(book)}
                            >
                              <i className="fa-solid fa-pen me-1"></i>
                              Edit
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger rounded-3"
                              onClick={() => handleDelete(book.id)}
                            >
                              <i className="fa-solid fa-trash me-1"></i>
                              Delete
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
    </div>
  </div>
);
}

export default ManageBooks;