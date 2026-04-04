import React , {useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
            const response = await axios.post(
                'http://127.0.0.1:8000/api/admin/login/', 
                { username, password }
            );

            if(response.data.success === true){
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
        <i className="fas fa-user-shield text-white fs-3"></i>
      </div>

      <h2 className="fw-bold text-white">Admin Login</h2>
      <p className="text-light">Access admin dashboard securely</p>
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

              {/* USERNAME */}
              <div className="mb-4 position-relative">
                <i className="fas fa-user position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  placeholder="Admin Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control ps-5"
                  style={inputStyle}
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-4 position-relative">
                <i className="fas fa-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login as Admin
                  </>
                )}
              </button>

              {/* FOOTER */}
              <p className="text-center mt-4 text-light" style={{ fontSize: "14px" }}>
                Use your superuser credentials
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

// 🔥 Same reusable style
const inputStyle = {
  height: "52px",
  borderRadius: "12px",
  border: "none",
  background: "rgba(255,255,255,0.85)"
};

export default AdminLogin;