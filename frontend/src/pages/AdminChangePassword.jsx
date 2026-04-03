import React , {useState,useEffect, use} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminChangePassword = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
    },[]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/change_admin_password/',
                 { 
                    current_password: currentPassword, 
                    new_password: newPassword,
                    username: adminUser,
                    confirm_password: confirmPassword
                 });
            if(response.data.success){
                    toast.success(response.data.message || 'Password changed successfully!');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                }
            }
        catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('An error occurred while changing the password. Please try again.');
            }
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
      <div className="row mb-5">
        <div className="col-lg-6 col-md-8 mx-auto text-center">
          <div className="bg-white shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-2 text-dark">
              <i className="fa-solid fa-key me-2 text-primary"></i>
              Admin Change Password
            </h4>
            <p className="text-muted small mb-0">
              <i className="fa-solid fa-shield-halved me-1 text-success"></i>
              Securely update your admin credentials
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-6 mx-auto">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body p-9">

              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-user-pen me-2 text-primary"></i>
                    Current Password
                  </label>
                  <div className="input-group shadow-sm">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="fa-solid fa-user text-muted"></i>
                    </span>
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      className="form-control border-start-0"
                      placeholder="Enter current password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-secondary border-start-0" 
                    onClick={() => setShowCurrentPass(!showCurrentPass)}>
                        {showCurrentPass ? (
                            <i className="fa-solid fa-eye-slash"></i>
                        ) : (<i className="fa-solid fa-eye"></i>)}

                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-user-pen me-2 text-primary"></i>
                    New Password
                  </label>
                  <div className="input-group shadow-sm">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="fa-solid fa-key text-muted"></i>
                    </span>
                    <input
                      type={showNewPass ? "text" : "password"}
                      className="form-control border-start-0"
                      placeholder="Enter new password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-secondary border-start-0" 
                    onClick={() => setShowNewPass(!showNewPass)}>
                        {showNewPass ? (
                            <i className="fa-solid fa-eye-slash"></i>
                        ) : (<i className="fa-solid fa-eye"></i>)}

                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fa-solid fa-user-pen me-2 text-primary"></i>
                    Confirm Password
                  </label>
                  <div className="input-group shadow-sm">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="fa-solid fa-key text-muted"></i>
                    </span>
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      className="form-control border-start-0"
                      placeholder="Confirm new password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-secondary border-start-0" 
                    onClick={() => setShowConfirmPass(!showConfirmPass)}>
                        {showConfirmPass ? (
                            <i className="fa-solid fa-eye-slash"></i>
                        ) : (<i className="fa-solid fa-eye"></i>)}

                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold rounded-3 shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      updating...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk me-2"></i>
                      Update
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
}

export default AdminChangePassword
