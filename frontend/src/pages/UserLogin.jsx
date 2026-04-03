import React , {useState,useEffect, use} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        login_id: '',
        password: '',
    });
   
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    }
   
    

    const handleSubmit = async (e) => {
        e.preventDefault();


        setLoading(true);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user_login/',
                {
                    login_id: formData.login_id,
                    password: formData.password,
                }
                );
              
              
            if(response.data.success){
                localStorage.setItem("studentUser", JSON.stringify(response.data));
                    toast.success(`Login Successfull !`);
                    navigate("/user/dashboard");
                    setFormData({
                        login_id: '',
                        password: '',
                    });
                }
                else{
                    toast.error(response.data.message || 'Login failed. Please try again.');
                }
            }
        catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Login failed. Please try again.');
                    }
    
        finally {
                setLoading(false);
                }
    }
return (
  <div
    className="py-5 d-flex align-items-center"
    style={{
      minHeight: "100px",
      background: "linear-gradient(135deg, #eef2f7, #f8f9fa)",
    }}
  >
    <div className="container">

      {/* Header */}
      <div className="row mb-4">
        <div className="col-lg-6 col-md-2 mx-auto text-center">
          <div className="bg-white shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-2 text-dark">
              <i className="fa-solid fa-user-plus me-2 text-primary"></i>
                Student Login
            </h4>
            <p className="text-muted small mb-0">
              <i className="fa-solid fa-user me-1 text-success"></i>
              Login to access the library resources and manage your account.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <div className="col-lg-50 col-md-7 mx-auto">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body p-9">

              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-user me-2 text-primary"></i>
                    Email or Student ID
                  </label>
                
                    <input
                      type="text"
                      name='login_id'
                      className="form-control border-start-0"
                      placeholder="Enter email or student ID"
                      required
                      value={formData.login_id}
                      onChange={handleChange}
                    /> 
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-key me-2 text-primary"></i>
                    Password
                  </label>
                
                    <input
                      type="password"
                      name='password'
                      className="form-control border-start-0"
                      placeholder="Enter password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    /> 
                </div>

                
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold rounded-3 shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Logging In...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-user me-2"></i>
                      Login Now
                    </>
                  )}
                </button>
                <p className="text-center mt-3 text-muted">
                  New User?<a href="/user/signup" className="text-decoration-none text-primary">Signup here</a>
                </p>

              </form>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
}

export default UserLogin
