import React , {useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
           // Add the trailing slash at the end of the URL
const response = await axios.post('http://127.0.0.1:8000/api/admin/login/', { username, password });
            if(response.data.success === true)
                {
            toast.success(response.data.message || 'Login successful!');
            localStorage.setItem('adminUser', response.data.username);
            navigate('/admin/dashboard');
                }   
            else{
                toast.error(response.data.message || 'Login failed. Please check your credentials.');
                }
            }
        catch (err) {
            console.error(err);
            toast.error("Login failed. Please check your credentials.");
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
    background: "linear-gradient(135deg, #f8f9fa, #e9ecef)"
  }}
>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-9">

        {/* Header */}
        <div className="text-center mb-4">
          <div className="bg-white rounded-4 shadow-sm p-4">
            <div className="mb-3">
              <i className="bi bi-shield-lock-fill text-primary fs-2"></i>
            </div>
            <h4 className="fw-bold text-dark mb-1">
              Admin Login
            </h4>
            <p className="text-muted small mb-0">
              Access the school management dashboard
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-4 p-md-5">

            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="mb-4">
                <label className="form-label fw-semibold small text-secondary">
                  Username
                </label>

                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-person-fill text-primary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 rounded-end"
                    placeholder="Enter admin username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold small text-secondary">
                  Password
                </label>

                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-lock-fill text-primary"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 rounded-end"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold py-2 rounded-3 shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Use the account created via <code>superuser</code>
          </p>
        </div>

      </div>
    </div>
  </div>
</div>
  )
 }
export default AdminLogin
