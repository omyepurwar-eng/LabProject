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
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    }}
  >
    <div className="container">

      {/* HEADER (same style as login/home) */}
      <div className="row mb-4">
        <div className="col-lg-6 mx-auto text-center">
          <div className="bg-white shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-2 text-dark">
              <i className="fa-solid fa-user-plus me-2 text-primary"></i>
              Student Registration
            </h4>
            <p className="text-muted small mb-0">
              Create your account to access library services
            </p>
          </div>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                {/* FULL NAME */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-user me-2 text-primary"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    className="form-control"
                    placeholder="Enter full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* MOBILE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-mobile me-2 text-primary"></i>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-envelope me-2 text-primary"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter valid email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-key me-2 text-primary"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-check-circle me-2 text-primary"></i>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* BUTTON */}
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

                {/* LOGIN LINK */}
                <p className="text-center mt-3 text-muted">
                  Already have an account?{" "}
                  <a
                    href="/user/login"
                    className="text-decoration-none text-primary fw-semibold"
                  >
                    Login here
                  </a>
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
