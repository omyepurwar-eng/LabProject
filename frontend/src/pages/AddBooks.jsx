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
    <div className='py-5' style={{background:"linear-gradient(135deg, #f8f9fa, #e9ecef)"}}>
        <div className='container justify-flex-auto'>
            <div className='row mb-4'>
                <div className='col-md-9 mx-auto'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-auto'>
                            <i className="bi bi-layer-group text-primary"></i>Add Book</h4>
                            <p className='text-muted small'>Add new book, their categories. </p>

                    </div>

                </div>
            </div>

                    <div className='row flex justify-content-between gap-3'>
                        <div className='col-md-12'>
                            <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>

                            {loadingDropdown ? (
                                <div className="d-flex justify-content-center my-5">
                                    <span className="spinner-border text-primary"></span>
                                </div>
                            ) : (
                        <form onSubmit={handleSubmit}>
                            <div className='row g-3'>
                                <div className='col-md-6'>
                                <label className='form-label small fw-semibold'>Book Name</label> 
                                    <input type="text" className="form-control" placeholder='e.g. The Great Gatsby, Harry Potter'
                                    required
                                    value={title}
                                    onChange={(e)=> setTitle(e.target.value)}/>
                                </div>

                                <div className='col-md-6'>
                                <label className='form-label small fw-semibold'>Category</label> 
                                    <select className="form-select" 
                                    required
                                    value={category}
                                    onChange={(e)=> setCategory(e.target.value)}>
                                        <option value="">-- Select Category --</option>
                                        {categories.map((cat)=> (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='col-md-6'>
                                <label className='form-label small fw-semibold'>Authors</label> 
                                    <select className="form-select" 
                                    required
                                    value={author}
                                    onChange={(e)=> setAuthor(e.target.value)}>
                                        <option value="">Select Author</option>
                                        {authors.map((auth)=> (
                                            <option key={auth.id} value={auth.id}>{auth.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='col-md-6'>
                                <label className='form-label small fw-semibold'>ISBN No.</label> 
                                    <input type="text" className="form-control"
                                     placeholder='unique isbn number'
                                     required
                                        value={isbn}
                                        onChange={(e)=> setIsbn(e.target.value)}
                                     />
                                     <p className = "text-muted small mb-0">ISBN must be unique for each book.</p>
                                </div>

                                <div className='col-md-4'>
                                <label className='form-label small fw-semibold'>Price</label> 
                                    <input type="number" className="form-control"
                                    min="0" step="0.01"
                                     placeholder='e.g. 19.99'
                                     required
                                        value={price}
                                        onChange={(e)=> setPrice(e.target.value)}
                                     />
                                     <p className = "text-muted small mb-0">Price must be a valid number.</p>
                                </div>

                                <div className='col-md-4'>
                                <label className='form-label small fw-semibold'>Quantity</label> 
                                    <input type="number" className="form-control"
                                    min="0" step="1"
                                     placeholder='e.g. 1, 5, 10'
                                     required
                                        value={quantity}
                                        onChange={(e)=> setQuantity(e.target.value)}
                                     />
                                     <p className = "text-muted small mb-0">Quantity must be a valid number.</p>
                                </div>

                                <div className='col-md-4'>
                                <label className='form-label small fw-semibold'>Cover</label> 
                                    <input type="file" className="form-control"
                                    accept='image/*'
                                        placeholder='Upload cover image (optional)'
                                        onChange={(e)=> setCoverFile(e.target.files[0])}
                                     />
                                     <p className = "text-muted small mb-0">Cover must be a valid image file.</p>
                                </div>

                            </div>
                            
                            <div className='d-flex justify-content-end mt-4'>

                                <button type='submit' className='btn btn-primary w-100 mt-3 fw-semibold' disabled={loading}>
                                {loading ? (
                                <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Submiting....
                                </>
                                ) : (
                                
                                <span>Submit</span>
                                )}
                            </button>

                            </div>
                           
                        </form>
                                )}
                        </div>

                        </div>

                        </div>
                       

                    </div>
                    

                

            

        </div>
        
      
    </div>
  )
}

export default AddBook