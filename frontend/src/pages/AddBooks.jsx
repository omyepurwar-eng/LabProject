import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [coverFile, setCoverFile] = useState(null);
    
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const[loadingDropdown, setLoadingDropdown] = useState(false);
    
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        else{
            fetchDropdownData();
        }
    },[]);

    const fetchDropdownData = async () => {
        setLoadingDropdown(true);
        try{
            const [authRes, catRes] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/authors/'),
                axios.get('http://127.0.0.1:8000/api/categories/')
            ]);
            const activeCats = (catRes.data).filter((c)=> c.is_active);
              setCategories(activeCats);
              setAuthors(authRes.data);

        }
        catch(err){
            console.error(err);
            toast.error("Failed to load authors/categories.");
        }
        finally{
            setLoadingDropdown(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('price', price);
        formData.append('quantity', quantity);
        if(coverFile){
            formData.append('cover_image', coverFile);
        }

        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/books/add/', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response.data.success){
                    toast.success(response.data.message || 'Book added successfully!');
                    setTitle('');
                    setCategory('');
                    setAuthor(''); 
                    setIsbn('');
                    setPrice('');
                    setQuantity('');
                    setCoverFile(null);
                    fetchDropdownData();
                }
                else{
                    toast.error(response.data.message || 'Failed to add book.');
                }
            }

        catch (err) {
            console.error(err);
            toast.error("Something went wrong while adding the book.");
        }
    
        finally {
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

      {/* Header */}
      <div className="text-center mb-5 text-white">
        <h2 className="fw-bold">
          <i className="fa-solid fa-book-open me-2"></i> Add New Book
        </h2>
        <p className="opacity-75">Fill details to add a new book</p>
      </div>

      {/* Card */}
      <div
        className="card border-0 rounded-4 shadow-lg"
        style={{
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)"
        }}
      >
        <div className="card-body p-4">

          {loadingDropdown ? (
            <div className="text-center py-5">
              <div className="spinner-border text-light"></div>
            </div>
          ) : (

            <form onSubmit={handleSubmit}>
              <div className="row g-4">

                {/* Title */}
                <div className="col-md-6">
                  <label className="form-label text-white small">Book Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-white border-light">
                      <i className="fa-solid fa-book"></i>
                    </span>
                    <input
                      className="form-control bg-transparent text-white border-light"
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="col-md-6">
                  <label className="form-label text-white small">Category</label>
                  <select
                    className="form-select border-light"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    required
                  >
                    <option value="" style={{color:"black"}}>Select Category</option>
                    {categories.map(c=>(
                      <option key={c.id} value={c.id} style={{color:"black"}}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="col-md-6">
                  <label className="form-label text-white small">Author</label>
                  <select
                    className="form-select border-light"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                    required
                  >
                    <option value="" style={{color:"black"}}>Select Author</option>
                    {authors.map(a=>(
                      <option key={a.id} value={a.id} style={{color:"black"}}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ISBN */}
                <div className="col-md-6">
                  <label className="form-label text-white small">ISBN</label>
                  <input
                    className="form-control bg-transparent text-white border-light"
                    value={isbn}
                    onChange={(e)=>setIsbn(e.target.value)}
                    required
                  />
                </div>

                {/* Price */}
                <div className="col-md-4">
                  <label className="form-label text-white small">Price</label>
                  <input
                    type="number"
                    className="form-control bg-transparent text-white border-light"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    required
                  />
                </div>

                {/* Quantity */}
                <div className="col-md-4">
                  <label className="form-label text-white small">Quantity</label>
                  <input
                    type="number"
                    className="form-control bg-transparent text-white border-light"
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="col-md-4">
                  <label className="form-label text-white small">Cover Image</label>
                  <input
                    type="file"
                    className="form-control border-light"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
                    onChange={(e)=>setCoverFile(e.target.files[0])}
                  />
                </div>

              </div>

              {/* Button */}
              <button
                className="btn w-100 mt-4 fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #e0e7ff)",
                  color: "#1e3a8a",
                  borderRadius: "12px",
                  transition: "0.3s"
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-plus me-2"></i>
                    Add Book
                  </>
                )}
              </button>

            </form>

          )}
        </div>
      </div>

    </div>
  </div>
)
}

export default AddBook;