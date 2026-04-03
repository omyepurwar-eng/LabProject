import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
            const response = await axios.get('http://127.0.0.1:8000/api/categories/');
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
            const response = await axios.put(`http://127.0.0.1:8000/api/update_category/${editId}/`, { name: editName, status: editStatus }
            );
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
        // 1. Confirm with the user first
    const ok = window.confirm("Are you sure you want to delete this category? This action cannot be undone.");
       if (!ok) return;
            try {
                // 2. Call the API
                // I am assuming the endpoint structure matches your Update URL
                const response = await axios.delete(`http://127.0.0.1:8000/api/delete_category/${id}/`);

                // 3. Handle success
                // Adjust this condition based on your exact API response structure
                if (response.data.success){
                    toast.success(response.data.message || "Category deleted successfully.");
                    setCategories((prev)=> prev.filter((cat) => cat.id !== id));

                }
                 else {
                    toast.error(response.data.message || "Failed to delete category.");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error occurred while deleting.");
            }
        
    }
  return (
    <div className='py-5' style={{background:"linear-gradient(135deg, #f8f9fa, #e9ecef)"}}>
        <div className='container justify-flex-auto '>
            <div className='row mb-4'>
                <div className='col-md-8 mx-auto d-flex justify-content-between align-items-center'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-auto'>
                            <i className="bi bi-layer-group text-primary"></i>Manage Categories</h4>
                            <p className='text-muted small'>View , edit and delete existing categories.</p>
                    </div>
                    <button className='btn btn-outline-primary btn-sm mb-3'
                    onClick={()=>navigate("/admin/category/add")}>
                        Add New Category
                    </button>
                </div>
            </div>
         

                    <div className='row gap-3'>
                        <div className='col-md-3'>
                            <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <h6 className='fw-semibold mb-3'>{editId ? "Edit Category" : "Select Category to Edit"}</h6>
                            {
                                editId ? (
                                     <form onSubmit={handleUpdate}>
                            <div className='mb-3'>
                                <label className='form-label small fw-semibold'>Category Name</label>
                                
                                    
                                    <input type="text" className="form-control" placeholder='e.g Science, Novel, Programming' required
                                    value={editName}
                                    onChange={(e)=> setEditName(e.target.value)}/>
                                    

                                
 
                            </div>
                            <div className='mb-3'>
                                <label className='form-label small fw-semibold'>Status</label>
                                
                                <div className='d-flex gap-3'>
                                    <div className='form-check'>
                                        <input type="radio" className="form-check-input" id="status-active" name="status" value="1"
                                        checked={editStatus === '1'}
                                        onChange={(e)=> setEditStatus(e.target.value)}
                                        />
                                    </div>
                                    <label className="form-check-label" htmlFor="status-active">Active</label>

                                </div>
                                <div className='d-flex gap-3'>
                                    <div className='form-check'>
                                        <input type="radio" className="form-check-input" id="status-inactive" name="status" value="0"
                                        checked={editStatus === '0'}
                                        onChange={(e)=> setEditStatus(e.target.value)}
                                        />
                                    </div>
                                    <label className="form-check-label" htmlFor="status-inactive">Inactive</label>

                                </div>
                                    

                                
 
                            </div>
                            <button type='submit' className='btn btn-primary w-100 mt-3 mb-1 fw-semibold' disabled={saving}>
                                {saving ? (
                                <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                <span>Updating...</span>
                                </>
                                ) : (
                                
                                <span>Update Category</span>
                                )}
                            </button>
                            <button type="button" className="btn btn-outline-secondary w-100 fw-semibold mt-1" onClick={cancelEdit}>
                                    Cancel
                            </button>
                           
                        </form>
                        ) : 
                        (
                            <p className='text-muted small'>Click on <strong>Edit</strong> to update category details.</p>
                        )
                            }
                       
                        </div>

                        </div>

                        </div>
                        <div className='col-md-8'>
                            <div className='card border-0 shadow-sm rounded-4'>
                                <div className='card-body p-4'>
                                    <h6 className='fw-bold mb-3'>List of Categories</h6>
                                    {loadingList ? (
                                        <div className='text-center py-4'>
                                            <div className='spinner-border text-primary'>
                                            </div>
                                        </div>
                                    ):categories.length === 0 ? (
                                        <p className='text-muted small'>No categories found.Try adding a new category.</p>

                                    ):(

                                        (
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead className='small text-muted'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Created At</th>
                                                    <th>Updated At</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {categories.map((cat,index) =>(
                                                <tr key = {cat.id}>
                                                    <th>{index + 1}</th>
                                                    <th>{cat.name}</th>
                                                    <th>{cat.is_active ?
                                                     (
                                                        <span className="badge bg-success-subtle text-success">
                                                            Active</span>
                                                    ) :
                                                    (
                                                    <span className="badge bg-danger-subtle text-danger">Inactive</span>

                                                    )
                                                    }</th>
                                                    <td className='small text-muted'>{new Date(cat.created_at).toLocaleDateString()}</td>
                                                    <td className='small text-muted'>{new Date(cat.updated_at).toLocaleDateString()}</td>
                                                    <td className='text-center d-flex'>
                                                        <button className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={()=>startEdit(cat)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger ms-2"
                                                         onClick={() => handleDelete(cat.id)}>
                                                                Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                                ))} 

                                                </tbody>
                                            </table>

                                        </div>

                                    )

                                    )
                                    }

                                      
                                    
                                </div>
                            </div>

                        </div>

                    </div>
                    

                

           

        </div>
        
      
    </div>
  )
}

export default ManageCategory