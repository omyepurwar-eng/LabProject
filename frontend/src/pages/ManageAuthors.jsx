import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const ManageAuthors = () => {

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [loadingList, setLoadingList] = useState(false);
    const [saving, setSaving] = useState(false);
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
        setLoadingList(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/authors/`);
            setAuthors(response.data);  
        }
        catch(err){
            console.error(err);
            toast.error("Failed to fetch authors.");
        }
        finally{
            setLoadingList(false);
        }
    }

    const startEdit = (author) => {
        setEditId(author.id);
        setEditName(author.name);
    }

    const cancelEdit = () => {
        setEditId(null);
        setEditName("");
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}/update_author/${editId}/`, { name: editName });
            if(response.data.success){
                toast.success(response.data.message || 'Author Updated.');
                cancelEdit();
                fetchAuthors();
            }
            else{
                toast.error(response.data.message || 'Failed to update author.');
            }
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to update author.");
        }
        finally {
            setSaving(false);
        }
    }

    const handleDelete = async (id) => {
        const ok = window.confirm("Are you sure you want to delete this author?");
        if (!ok) return;

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API}/delete_author/${id}/`);
            if (response.data.success){
                toast.success(response.data.message || "Author deleted successfully.");
                setAuthors((prev)=> prev.filter((author) => author.id !== id));
            } else {
                toast.error(response.data.message || "Failed to delete author.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error occurred while deleting.");
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
        <h2 className="fw-bold text-white">Manage Authors</h2>
        <p className="text-light small">View, edit and delete authors</p>

        <button
          className="btn fw-semibold mt-3"
          style={buttonStyle}
          onClick={()=>navigate("/admin/author/add")}
        >
          <i className="fas fa-plus me-2"></i>Add Author
        </button>
    </div>

    <div className="row g-4">

        {/* EDIT SECTION */}
        <div className="col-md-4">
            <div style={cardStyle}>
                <h5 className="text-white mb-3">
                    <i className="fas fa-edit me-2"></i>
                    {editId ? "Edit Author" : "Select Author"}
                </h5>

                {editId ? (
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="text-light small">Author Name</label>
                            <div className="input-group">
                                <span className="input-group-text bg-transparent border-0 text-white">
                                    <i className="fas fa-user"></i>
                                </span>
                                <input
                                  type="text"
                                  className="form-control glass-input"
                                  value={editName}
                                  onChange={(e)=> setEditName(e.target.value)}
                                  required
                                />
                            </div>
                        </div>

                        <button
                          type="submit"
                          className="btn w-100 mt-3 fw-semibold"
                          style={buttonStyle}
                          disabled={saving}
                        >
                          {saving ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-check me-2"></i>Update Author
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          className="btn w-100 mt-2 fw-semibold"
                          style={cancelBtn}
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                    </form>
                ) : (
                    <p className="text-light small">
                        Click edit button from table to update author.
                    </p>
                )}
            </div>
        </div>

        {/* TABLE */}
        <div className="col-md-8">
            <div style={cardStyle}>
                <h5 className="text-white mb-3">
                    <i className="fas fa-list me-2"></i>Authors List
                </h5>

                {loadingList ? (
                    <div className="text-center py-4">
                        <div className="spinner-border text-light"></div>
                    </div>
                ) : authors.length === 0 ? (
                    <p className="text-light small">No authors found.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table text-white align-middle">
                            <thead className="small text-light">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Created</th>
                                    <th>Updated</th>
                                    <th>Actions</th>
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
                                        <td className="small">
                                            {new Date(author.updated_at).toLocaleDateString()}
                                        </td>
                                        <td className="d-flex gap-2">

                                            {/* EDIT */}
                                            <button
                                              className="btn btn-sm"
                                              style={editBtn}
                                              onClick={()=>startEdit(author)}
                                            >
                                              <i className="fas fa-pen"></i>
                                            </button>

                                            {/* DELETE */}
                                            <button
                                              className="btn btn-sm"
                                              style={deleteBtn}
                                              onClick={()=>handleDelete(author.id)}
                                            >
                                              <i className="fas fa-trash"></i>
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

table tr {
  border-color: rgba(255,255,255,0.1);
}

button:hover {
  transform: scale(1.05);
  transition: 0.2s ease;
}
`}</style>

</div>
);
}

// 🔥 STYLES
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
  color: "#fff"
};

const buttonStyle = {
  background: "rgba(255,255,255,0.2)",
  color: "#fff",
  border: "none",
  borderRadius: "10px"
};

const editBtn = {
  background: "rgba(59,130,246,0.9)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "6px 10px"
};

const deleteBtn = {
  background: "rgba(239,68,68,0.9)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "6px 10px"
};

const cancelBtn = {
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  border: "none"
};

export default ManageAuthors;