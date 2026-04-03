import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddAuthor = () => {const [name, setName] = useState('');
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
            toast.error("Failed to fetch authors.");}
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
    <div className='py-5' style={{background:"linear-gradient(135deg, #f8f9fa, #e9ecef)", }}>
        <div className='container justify-flex-auto'>
            <div className='row mb-4'>
                <div className='col-md-9 mx-auto'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-auto'>
                            <i className="fa-solid fa-user-pen text-primary"></i>Add Author</h4>
                            <p className='text-muted small'>Cretae new book authors and manage their details. </p>

                    </div>

                </div>
            </div>

                    <div className='row gap-3'>
                        <div className='col-md-3'>
                            <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label small fw-semibold'>Author Name</label>
                                
                                    
                                    <input type="text" className="form-control" placeholder='e.g Shakespere, baba-amte,etc..' required
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}/>
                                    

                                
 
                            </div>
                            
                            <button type='submit' className='btn btn-primary w-100 mt-3 fw-semibold' disabled={loading}>
                                {loading ? (
                                <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Adding....
                                </>
                                ) : (
                                
                                <span>Add Author</span>
                                )}
                            </button>
                           
                        </form>
                        </div>

                        </div>

                        </div>
                        <div className='col-md-7'>
                            <div className='card border-0 shadow-sm rounded-4'>
                                <div className='card-body p-4'>
                                    <h6 className='fw-bold mb-3'>Existing Authors</h6>
                                    {authors.length === 0 ? (
                                        <p className='text-muted small'>No authors found.</p>

                                    ) : (
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Created At</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {authors.map((author,index) =>(
                                                <tr key = {author.id}>
                                                    <th>{index + 1}</th>
                                                    <th>{author.name}</th>
                                                    <th className='small text-muted'>{new Date(author .created_at).toLocaleDateString()}</th>
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

export default AddAuthor
