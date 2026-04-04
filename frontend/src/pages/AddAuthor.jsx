import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const AddAuthor = () => {

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        else{
            fetchAuthors();
        }
    },[]);

    const fetchAuthors = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/authors/');
            setAuthors(response.data);  
        }
        catch(err){
            console.error(err);
            toast.error("Failed to fetch authors.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/author/add/', { name });
            if(response.data.success){
                toast.success(response.data.message || 'Author created successfully!');
                setName('');
                fetchAuthors();
            }
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to create author.");
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

    {/* HEADER */}
    <div className="text-center mb-5">
      <div style={headerIcon}>
        <i className="fas fa-user-pen"></i>
      </div>
      <h2 className="fw-bold text-white">Add Author</h2>
      <p className="text-light small">
        Create and manage book authors easily
      </p>
    </div>

    <div className="row g-4">

      {/* FORM */}
      <div className="col-md-4">
        <div style={cardStyle}>
          <h5 className="text-white mb-3">
            <i className="fas fa-plus-circle me-2"></i>Add Author
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-light small">
                Author Name
              </label>

              <div className="input-group">
                <span className="input-group-text bg-transparent border-0 text-white">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control glass-input"
                  placeholder="e.g Shakespeare, Baba Amte"
                  required
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-semibold mt-3"
              style={buttonStyle}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Adding...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-2"></i>Add Author
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* TABLE */}
      <div className="col-md-8">
        <div style={cardStyle}>
          <h5 className="text-white mb-3">
            <i className="fas fa-list me-2"></i>Existing Authors
          </h5>

          {authors.length === 0 ? (
            <p className="text-light small">No authors found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table text-white align-middle">
                <thead>
                  <tr className="text-light small">
                    <th>#</th>
                    <th>Name</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author,index) =>(
                    <tr key={author.id}>
                      <td>{index + 1}</td>
                      <td>
                        <i className="fas fa-user me-2"></i>
                        {author.name}
                      </td>
                      <td className="small">
                        {new Date(author.created_at).toLocaleDateString()}
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

  {/* CUSTOM STYLES */}
  <style>{`
    .glass-input {
      background: rgba(255,255,255,0.15);
      border: none;
      color: white;
      backdrop-filter: blur(10px);
    }

    .glass-input::placeholder {
      color: rgba(255,255,255,0.7);
    }

    .glass-input:focus {
      background: rgba(255,255,255,0.2);
      color: white;
      box-shadow: none;
    }

    table tr {
      border-color: rgba(255,255,255,0.1);
    }
  `}</style>

</div>
);
}

// 🔥 STYLES (same as your theme)
const cardStyle = {
  borderRadius: "20px",
  padding: "25px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
};

const headerIcon = {
  width: "70px",
  height: "70px",
  margin: "0 auto 15px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
  color: "#fff",
  backdropFilter: "blur(10px)"
};

const buttonStyle = {
  background: "rgba(255,255,255,0.2)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  backdropFilter: "blur(10px)"
};

export default AddAuthor;