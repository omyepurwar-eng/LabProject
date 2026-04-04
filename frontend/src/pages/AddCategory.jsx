import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [status, setStatus] = useState('1');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        else{
            fetchCategories();
        }
    },[]);

    const fetchCategories = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/categories/');
            setCategories(response.data);  
        }
        catch(err){
            console.error(err);
            toast.error("Failed to fetch categories.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/category/add/', { name, status });
            if(response.data.success){
                toast.success(response.data.message || 'Category created successfully!');
                setName('');
                setStatus('1');
                fetchCategories();
            }
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to load categories.");
        }
        finally {
            setLoading(false);
        }
    }

return (
<div className="py-5" style={pageBg}>
  <div className="container">

    {/* HEADER */}
    <div className="text-center mb-5">
      <div style={headerIcon}>
        <i className="fas fa-layer-group text-white"></i>
      </div>
      <h2 className="fw-bold text-white">
        <i className="fas fa-layer-group me-2 text-white"></i>
        Add Categories
      </h2>
      <p className="text-light small">
        Create and manage your book categories easily
      </p>
    </div>

    <div className="row g-4">

      {/* FORM */}
      <div className="col-md-4">
        <div style={cardStyle}>
          <h5 className="text-white mb-3">
            <i className="fas fa-plus-circle me-2 text-white"></i>
            Add Category
          </h5>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label text-light small">
                <i className="fas fa-tag me-2 text-white"></i>
                Category Name
              </label>

              <input
                type="text"
                className="form-control glass-input"
                placeholder="e.g Science, Novel"
                required
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light small">
                <i className="fas fa-toggle-on me-2 text-white"></i>
                Status
              </label>

              <div className="d-flex gap-4 mt-2 text-white">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="1"
                    checked={status === '1'}
                    onChange={(e)=> setStatus(e.target.value)}
                    className="me-2"
                  />
                  Active
                </label>

                <label>
                  <input
                    type="radio"
                    name="status"
                    value="0"
                    checked={status === '0'}
                    onChange={(e)=> setStatus(e.target.value)}
                    className="me-2"
                  />
                  Inactive
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-semibold mt-3"
              style={buttonPrimary}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-2 text-white"></i>
                  Create Category
                </>
              )}
            </button>

          </form>
        </div>
      </div>

      {/* TABLE */}
      <div className="col-md-8">
        <div style={tableCard}>
          <h5 className="text-white mb-3">
            <i className="fas fa-list me-2 text-white"></i>
            Existing Categories
          </h5>

          {categories.length === 0 ? (
            <p className="text-light small">No categories found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table text-white align-middle">
                <thead>
                  <tr className="text-light small">
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat,index) =>(
                    <tr key={cat.id}>
                      <td>{index + 1}</td>

                      <td>
                        <i className="fas fa-folder text-white me-2"></i>
                        {cat.name}
                      </td>

                      <td>
                        <span style={cat.is_active ? statusActive : statusInactive}>
                          {cat.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="small">
                        <i className="fas fa-calendar text-white me-1"></i>
                        {new Date(cat.created_at).toLocaleDateString()}
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

<style>{`
.glass-input {
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
}

.glass-input::placeholder {
  color: rgba(255,255,255,0.7);
}

.glass-input:focus {
  background: rgba(255,255,255,0.2);
  color: white;
  box-shadow: none;
}

.table tbody tr {
  background: rgba(255,255,255,0.05);
  transition: 0.3s;
}
.table tbody tr:hover {
  background: rgba(255,255,255,0.15);
}

button:hover {
  transform: scale(1.05);
}
`}</style>

</div>
);
}

// 🎨 STYLES
const pageBg = {
  minHeight:"100vh",
  background:"linear-gradient(135deg, #1e3a8a, #3b82f6, #93c5fd)"
};

const cardStyle = {
  borderRadius:"20px",
  padding:"25px",
  background:"rgba(255,255,255,0.15)",
  backdropFilter:"blur(20px)",
  boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
};

const tableCard = {
  borderRadius:"20px",
  padding:"25px",
  background:"rgba(255,255,255,0.12)",
  backdropFilter:"blur(20px)"
};

const headerIcon = {
  width:"70px",
  height:"70px",
  margin:"0 auto 15px",
  borderRadius:"20px",
  background:"rgba(255,255,255,0.2)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontSize:"28px",
  color:"#fff"
};

const buttonPrimary = {
  background:"rgba(255,255,255,0.2)",
  color:"#fff",
  border:"none",
  borderRadius:"10px"
};

const statusActive = {
  background:"rgba(34,197,94,0.2)",
  color:"#22c55e",
  padding:"5px 12px",
  borderRadius:"20px",
  fontSize:"12px"
};

const statusInactive = {
  background:"rgba(239,68,68,0.2)",
  color:"#ef4444",
  padding:"5px 12px",
  borderRadius:"20px",
  fontSize:"12px"
};

export default AddCategory;