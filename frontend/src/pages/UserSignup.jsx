import React , {useState,useEffect, use} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserSignup = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
   
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    }
   
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user_signup/',
                { 
                    full_name: formData.full_name,
                    mobile: formData.mobile,
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirmPassword
                }
                );
              
              
            if(response.data.success){
                    toast.success(`Registration Successfull ! Your STUDENT ID is ${response.data.student_id}`);
                    setFormData({
                        full_name: '',
                        mobile: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                }
                else{
                    toast.error(response.data.message || 'Registration failed. Please try again.');
                }
            }
        catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
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
                Student Registration
            </h4>
            <p className="text-muted small mb-0">
              <i className="fa-solid fa-user-plus me-1 text-success"></i>
              Register as a new student to access the library resources and manage your account.
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
                    Full Name
                  </label>
                
                    <input
                      type="text"
                      name='full_name'
                      className="form-control border-start-0"
                      placeholder="Enter full name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                    /> 
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-mobile me-2 text-primary"></i>
                    Mobile Number
                  </label>
                
                    <input
                      type="text"
                      name='mobile'
                      className="form-control border-start-0"
                      placeholder="Enter mobile number"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                    /> 
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-envelope me-2 text-primary"></i>
                    Email Address
                  </label>
                
                    <input
                      type="email"
                      name='email'
                      className="form-control border-start-0"
                      placeholder="Enter valid email address"
                      required
                      value={formData.email}
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
                      name = 'password'
                      className="form-control border-start-0"
                      placeholder="Enter password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    /> 
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-check-circle me-2 text-primary"></i>
                    Confirm Password
                  </label>
                
                    <input
                      type="password"
                      name='confirmPassword'
                      className="form-control border-start-0"
                      placeholder="Confirm password"
                      required
                      value={formData.confirmPassword}
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
                      Signing Up...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-user-plus me-2"></i>
                      Sign Up
                    </>
                  )}
                </button>
                <p className="text-center mt-3 text-muted">
                  Already have an account? <a href="/user/login" className="text-decoration-none text-primary">Login here</a>
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

export default UserSignup
