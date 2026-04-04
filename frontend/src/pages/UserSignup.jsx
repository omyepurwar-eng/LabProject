import React , {useState} from 'react'
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
            toast.error("Passwords do not match.");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/user_signup/`,
                { 
                    full_name: formData.full_name,
                    mobile: formData.mobile,
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirmPassword
                }
            );
              
            if(response.data.success){
                toast.success(`Registration Successful! ID: ${response.data.student_id}`);
                setFormData({
                    full_name: '',
                    mobile: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
            else{
                toast.error(response.data.message || 'Registration failed.');
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed.');
        }
        finally {
            setLoading(false);
        }
    }

return (
<div
  className="d-flex align-items-center justify-content-center"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3a8a, #3b82f6, #93c5fd)",
    padding: "30px"
  }}
>
  <div className="container">

    {/* HEADER */}
    <div className="text-center mb-5">
      <div
        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >
        <i className="fas fa-user-plus text-white fs-3"></i>
      </div>

      <h2 className="fw-bold text-white">Student Signup</h2>
      <p className="text-light">Create your library account</p>
    </div>

    {/* CARD */}
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">

        <div
          className="card border-0"
          style={{
            borderRadius: "20px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
          }}
        >
          <div className="card-body p-5">

            <form onSubmit={handleSubmit}>

              {/* FULL NAME */}
              <div className="mb-3 position-relative">
                <i className="fas fa-user position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="form-control ps-5"
                  style={inputStyle}
                />
              </div>

              {/* MOBILE */}
              <div className="mb-3 position-relative">
                <i className="fas fa-phone position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-control ps-5"
                  style={inputStyle}
                />
              </div>

              {/* EMAIL */}
              <div className="mb-3 position-relative">
                <i className="fas fa-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control ps-5"
                  style={inputStyle}
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3 position-relative">
                <i className="fas fa-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control ps-5"
                  style={inputStyle}
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-4 position-relative">
                <i className="fas fa-check-circle position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control ps-5"
                  style={inputStyle}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="btn w-100 text-white fw-bold"
                style={{
                  height: "55px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.5)"
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing Up...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus me-2"></i>
                    Create Account
                  </>
                )}
              </button>

              {/* FOOTER */}
              <p className="text-center mt-4 text-light" style={{ fontSize: "14px" }}>
                Already have an account?{" "}
                <a
                  href="/user/login"
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    textDecoration: "underline"
                  }}
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

// 🔥 Reusable input style (same as login)
const inputStyle = {
  height: "52px",
  borderRadius: "12px",
  border: "none",
  background: "rgba(255,255,255,0.85)"
};

export default UserSignup;