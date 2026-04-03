import React , {useState,useEffect,} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

const StudentChangePassword = () => {
    
    const [form, setForm] = useState({
        current_password : "",
        new_password : "",
        confirm_password : "" 
    });
   
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

useEffect(() => {
        if (!studentUser) {
            navigate("/user/login");
            return;
        }   
}, []);

    const handleChange = (e) => {
        const{ name , value } = e.target;
        setForm((prevForm)=>({
            ...prevForm,
            [name]:value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if (form.new_password !== form.confirm_password){
            toast.error("New password does not match the confirm password.")
            return;
        }

        try{
            setSaving(true);
            const resp = await axios.post("http://127.0.0.1:8000/api/user/change_password/",{
                student_id:studentUser.student_id,
                current_password:form.current_password,
                new_password:form.new_password,
                confirm_password:form.confirm_password
            });
            toast.success(resp.data.message ||"Password Changed SuccessFully")

            setForm({
                current_password:"",
                new_password:"",
                confirm_password:"",
            });
        }catch (err) {
            console.error(err)
            toast.error("Failed To change password.")
        }finally{
            setSaving(false);
        }

    }
  return (
     <div
  className="d-flex align-items-center"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe, #f8fafc)",
    paddingTop: "90px",
    paddingBottom: "90px"
  }}
>
  <div className="container">

    {/* Header Section */}
    <div
      className="d-flex flex-wrap justify-content-between align-items-center mb-5"
      style={{ marginBottom: "65px" }}
    >
      <div>
        <h3
          className="fw-bold d-flex align-items-center gap-3 mb-2"
          style={{ fontSize: "26px", letterSpacing: "0.6px" }}
        >
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-4"
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #0d6efd, #2563eb)",
              boxShadow: "0 12px 30px rgba(13,110,253,0.35)"
            }}
          >
            <i className="fas fa-key text-white fs-4"></i>
          </span>
          Change Password
        </h3>

        <p
          className="fw-semibold mb-0"
          style={{
            color: "#6c757d",
            fontSize: "15px"
          }}
        >
          Secure your account by updating your password regularly.
        </p>
      </div>

      <p
        className="mt-3 fw-semibold"
        style={{
          fontSize: "14px",
          background: "#ffffff",
          padding: "8px 18px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
        }}
      >
        Welcome {studentUser.full_name || "Guest"}
      </p>
    </div>

    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-12">

        <div
          className="card border-0"
          style={{
            borderRadius: "18px",
            boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
            overflow: "hidden"
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "45px 35px"
            }}
          >
            <form onSubmit={handleSubmit}>

              {/* Current Password */}
              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: "14px" }}
                >
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="current_password"
                  name="current_password"
                  value={form.current_password}
                  onChange={handleChange}
                  required
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    border: "1px solid #dee2e6",
                    padding: "0 14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                />
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: "14px" }}
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="new_password"
                  name="new_password"
                  value={form.new_password}
                  onChange={handleChange}
                  required
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    border: "1px solid #dee2e6",
                    padding: "0 14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: "14px" }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  required
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    border: "1px solid #dee2e6",
                    padding: "0 14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={saving}
                className={`btn ${saving ? 'btn-secondary' : 'btn-primary'} w-100 bg-primary text-white`}
                style={{
                  height: "52px",
                  borderRadius: "14px",
                  fontWeight: "600",
                  fontSize: "15px",
                  letterSpacing: "0.6px",
                  boxShadow: "0 10px 25px rgba(13,110,253,0.4)",
                  transition: "all 0.3s ease"
                }}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-key me-2"></i>
                    Update Password
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
  )
}

export default StudentChangePassword