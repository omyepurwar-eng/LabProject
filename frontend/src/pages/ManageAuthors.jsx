import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
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
            const response = await axios.get('http://127.0.0.1:8000/api/authors/');
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
            const response = await axios.put(`http://127.0.0.1:8000/api/update_author/${editId}/`, { name: editName }
            );
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
        // 1. Confirm with the user first
    const ok = window.confirm("Are you sure you want to delete this author? This action cannot be undone.");

       if (!ok) return;
            try {
                // 2. Call the API
                // I am assuming the endpoint structure matches your Update URL
                const response = await axios.delete(`http://127.0.0.1:8000/api/delete_author/${id}/`);

                // 3. Handle success
                // Adjust this condition based on your exact API response structure
                if (response.data.success){
                    toast.success(response.data.message || "Author deleted successfully.");
                    setAuthors((prev)=> prev.filter((author) => author.id !== id));

                }
                 else {
                    toast.error(response.data.message || "Failed to delete author.");
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
                            <i className="bi bi-layer-group text-primary"></i>Manage Author</h4>
                            <p className='text-muted small'>View and delete existing authors.</p>
                    </div>
                    <button className='btn btn-outline-primary btn-sm mb-3'
                    onClick={()=>navigate("/admin/author/add")}>
                        <i className="fa-solid fa-plus me-1"></i>
                        Add New Author
                    </button>
                </div>
            </div>
         

                    <div className='row gap-3'>
                        <div className='col-md-3'>
                            <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <h6 className='fw-semibold mb-3'>{editId ? "Edit Author" : "Select Author to Edit"}</h6>
                            {
                                editId ? (
                                     <form onSubmit={handleUpdate}>
                            <div className='mb-3'>
                                <label className='form-label small fw-semibold'>Author Name</label>
                                
                                    
                                    <input type="text" className="form-control" placeholder='e.g Shakespere, baba-amte,etc..' required
                                    value={editName}
                                    onChange={(e)=> setEditName(e.target.value)}/>

                                
 
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
                            <p className='text-muted small'>Click on <strong>Edit</strong> to update author details.</p>
                        )
                            }
                       
                        </div>

                        </div>

                        </div>
                        <div className='col-md-8'>
                            <div className='card border-0 shadow-sm rounded-4'>
                                <div className='card-body p-4'>
                                    <h6 className='fw-bold mb-3'>List of Authors</h6>
                                    {loadingList ? (
                                        <div className='text-center py-4'>
                                            <div className='spinner-border text-primary'>
                                            </div>
                                        </div>
                                    ):authors.length === 0 ? (
                                        <p className='text-muted small'>No authors found.Try adding a new author.</p>

                                    ):(

                                        (
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead className='small text-muted'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    
                                                    <th>Created At</th>
                                                    <th>Updated At</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {authors.map((author,index) =>(
                                                <tr key = {author.id}>
                                                    <th>{index + 1}</th>
                                                    <th>{author.name}</th>
                                                    
                                                    <td className='small text-muted'>{new Date(author.created_at).toLocaleDateString()}</td>
                                                    <td className='small text-muted'>{new Date(author.updated_at).toLocaleDateString()}</td>
                                                    <td className='text-center d-flex'>
                                                        <button className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={()=>startEdit(author)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger ms-2"
                                                         onClick={() => handleDelete(author.id)}>
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

export default ManageAuthors;