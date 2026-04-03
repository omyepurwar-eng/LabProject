import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {const [name, setName] = useState('');
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
            toast.error("Failed to fetch categories.");}
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
    <div className='py-5' style={{background:"linear-gradient(135deg, #f8f9fa, #e9ecef)"}}>
        <div className='container justify-flex-auto'>
            <div className='row mb-4'>
                <div className='col-md-9 mx-auto'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-auto'>
                            <i className="bi bi-layer-group text-primary"></i>Add Category</h4>
                            <p className='text-muted small'>Cretae new book categories and manage their active status </p>

                    </div>

                </div>
            </div>

                    <div className='row gap-3'>
                        <div className='col-md-3'>
                            <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label small fw-semibold'>Category Name</label>
                                
                                    
                                    <input type="text" className="form-control" placeholder='e.g Science, Novel, Programming' required
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}/>
                                    

                                
 
                            </div>
                            <div className='mb-3'>
                                <label className='form-label small fw-semibold'>Status</label>
                                
                                <div className='d-flex gap-3'>
                                    <div className='form-check'>
                                        <input type="radio" className="form-check-input" id="status-active" name="status" value="1"
                                        checked={status === '1'}
                                        onChange={(e)=> setStatus(e.target.value)}
                                        />
                                    </div>
                                    <label className="form-check-label" htmlFor="status-active">Active</label>

                                </div>
                                <div className='d-flex gap-3'>
                                    <div className='form-check'>
                                        <input type="radio" className="form-check-input" id="status-inactive" name="status" value="0"
                                        checked={status === '0'}
                                        onChange={(e)=> setStatus(e.target.value)}
                                        />
                                    </div>
                                    <label className="form-check-label" htmlFor="status-inactive">Inactive</label>

                                </div>
                                    

                                
 
                            </div>
                            <button type='submit' className='btn btn-primary w-100 mt-3 fw-semibold' disabled={loading}>
                                {loading ? (
                                <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Creating....
                                </>
                                ) : (
                                
                                <span>Sign In</span>
                                )}
                            </button>
                           
                        </form>
                        </div>

                        </div>

                        </div>
                        <div className='col-md-7'>
                            <div className='card border-0 shadow-sm rounded-4'>
                                <div className='card-body p-4'>
                                    <h6 className='fw-bold mb-3'>Existing Ctaegories</h6>
                                    {categories.length === 0 ? (
                                        <p className='text-muted small'>No categories found.</p>

                                    ) : (
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Created At</th>
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
                                                    <th className='small text-muted'>{new Date(cat.created_at).toLocaleDateString()}</th>
                                                </tr>
                                                ))} 

                                                </tbody>
                                            </table>

                                        </div>

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

export default AddCategory
