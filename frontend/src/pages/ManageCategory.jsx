import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ManageCategory = () => {

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editStatus, setEditStatus] = useState('1');
    const [loadingList, setLoadingList] = useState(false);
    const [saving, setSaving] = useState(false);
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
        setLoadingList(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/categories/`);
            setCategories(response.data);  
        }
        catch(err){
            console.error(err);
            toast.error("Failed to fetch categories.");
        }
        finally{
            setLoadingList(false);
        }
    }

    const startEdit = (cat) => {
        setEditId(cat.id);
        setEditName(cat.name);
        setEditStatus(cat.is_active ? '1' : '0');
    }

    const cancelEdit = () => {
        setEditId(null);
        setEditName("");
        setEditStatus('1');
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}/update_category/${editId}/`, { name: editName, status: editStatus });
            if(response.data.success){
                toast.success(response.data.message || 'Category Updated.');
                cancelEdit();
                fetchCategories();
            }
            else{
                toast.error(response.data.message || 'Failed to update category.');
            }
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to update category.");
        }
        finally {
            setSaving(false);
        }
    }

    const handleDelete = async (id) => {
        const ok = window.confirm("Are you sure you want to delete this category?");
        if (!ok) return;

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API}/delete_category/${id}/`);
            if (response.data.success){
                toast.success(response.data.message || "Deleted.");
                setCategories((prev)=> prev.filter((cat) => cat.id !== id));
            }
            else {
                toast.error(response.data.message || "Failed.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error deleting.");
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
      <h4 className="fw-bold text-white mt-3">
        <i className="fas fa-layer-group text-white me-2"></i>
        Manage Categories
      </h4>
      <p className="text-light small">View, edit and manage categories</p>

      <button 
        className="btn mt-2"
        style={buttonPrimary}
        onClick={()=>navigate("/admin/category/add")}
      >
        <i className="fas fa-plus text-white me-2"></i>
        Add Category
      </button>
    </div>

    <div className="row g-4">

      {/* EDIT PANEL */}
      <div className="col-md-4">
        <div style={cardStyle}>
          <h6 className="text-white mb-3">
            <i className="fas fa-pen text-white me-2"></i>
            {editId ? "Edit Category" : "Select Category"}
          </h6>

          {editId ? (
            <form onSubmit={handleUpdate}>

              <div className="mb-3">
                <label className="text-light small">
                  <i className="fas fa-tag text-white me-2"></i>Name
                </label>
                <input
                  type="text"
                  className="form-control glass-input"
                  value={editName}
                  onChange={(e)=> setEditName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="text-light small">
                  <i className="fas fa-toggle-on text-white me-2"></i>Status
                </label>

                <div className="text-white mt-2">
                  <label className="me-3">
                    <input type="radio" value="1" checked={editStatus==='1'} onChange={(e)=>setEditStatus(e.target.value)} className="me-1"/>
                    Active
                  </label>

                  <label>
                    <input type="radio" value="0" checked={editStatus==='0'} onChange={(e)=>setEditStatus(e.target.value)} className="me-1"/>
                    Inactive
                  </label>
                </div>
              </div>

              <button type="submit" style={buttonPrimary} className="btn w-100 mt-2" disabled={saving}>
                {saving ? "Updating..." : "Update"}
              </button>

              <button type="button" style={buttonOutline} className="btn w-100 mt-2" onClick={cancelEdit}>
                Cancel
              </button>

            </form>
          ) : (
            <p className="text-light small">Click edit to modify a category</p>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="col-md-8">
        <div style={tableCard}>
          <h6 className="text-white mb-3">
            <i className="fas fa-list text-white me-2"></i>
            Categories List
          </h6>

          {loadingList ? (
            <div className="text-center text-white">Loading...</div>
          ) : categories.length === 0 ? (
            <p className="text-light small">No categories found</p>
          ) : (
            <div className="table-responsive">
              <table className="table text-white align-middle">
                <thead>
                  <tr className="text-light small">
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat,index)=>(
                    <tr key={cat.id}>
                      <td>{index+1}</td>

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

                      <td className="small">
                        <i className="fas fa-clock text-white me-1"></i>
                        {new Date(cat.updated_at).toLocaleDateString()}
                      </td>

                      <td>
                        <button style={editBtn} onClick={()=>startEdit(cat)}>
                          <i className="fas fa-pen text-white"></i>
                        </button>

                        <button style={deleteBtn} className="ms-2" onClick={()=>handleDelete(cat.id)}>
                          <i className="fas fa-trash text-white"></i>
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
.glass-input{
background:rgba(255,255,255,0.15);
border:none;
color:white;
}

.table tbody tr{
background:rgba(255,255,255,0.05);
transition:0.3s;
}
.table tbody tr:hover{
background:rgba(255,255,255,0.15);
}
button:hover{
transform:scale(1.05);
}
`}</style>

</div>
)
}

// 🎨 STYLES
const pageBg = {
  minHeight:"100vh",
  background:"linear-gradient(135deg, #1e3a8a, #3b82f6, #93c5fd)"
};

const cardStyle = {
  background:"rgba(255,255,255,0.12)",
  backdropFilter:"blur(20px)",
  borderRadius:"20px",
  padding:"20px"
};

const tableCard = {
  background:"rgba(255,255,255,0.12)",
  backdropFilter:"blur(20px)",
  borderRadius:"20px",
  padding:"20px"
};

const headerIcon = {
  width:"70px",
  height:"70px",
  borderRadius:"20px",
  background:"rgba(255,255,255,0.2)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  margin:"auto"
};

const buttonPrimary = {
  background:"rgba(255,255,255,0.2)",
  color:"#fff",
  border:"none"
};

const buttonOutline = {
  background:"transparent",
  border:"1px solid rgba(255,255,255,0.5)",
  color:"#fff"
};

const editBtn = {
  background:"rgba(59,130,246,0.3)",
  border:"none",
  padding:"6px 10px",
  borderRadius:"10px"
};

const deleteBtn = {
  background:"rgba(239,68,68,0.3)",
  border:"none",
  padding:"6px 10px",
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

export default ManageCategory;