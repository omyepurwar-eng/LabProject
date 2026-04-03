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
  className="d-flex align-items-center justify-content-center"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3a8a, #3b82f6, #93c5fd)",
    padding: "40px"
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
      <i className="fas fa-lock text-white fs-3"></i>
    </div>

    <h2 className="fw-bold text-white">Change Password</h2>
    <p className="text-light mb-2">Keep your account secure 🔐</p>

    <span
      style={{
        background: "rgba(255,255,255,0.2)",
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "13px",
        color: "#fff"
      }}
    >
      Welcome {studentUser.full_name || "Guest"}
    </span>
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

            {/* CURRENT PASSWORD */}
            <div className="mb-4 position-relative">
              <i className="fas fa-key position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input
                type="password"
                name="current_password"
                value={form.current_password}
                onChange={handleChange}
                required
                placeholder="Current Password"
                className="form-control ps-5"
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  border: "none",
                  background: "rgba(255,255,255,0.8)"
                }}
              />
            </div>

            {/* NEW PASSWORD */}
            <div className="mb-4 position-relative">
              <i className="fas fa-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input
                type="password"
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                required
                placeholder="New Password"
                className="form-control ps-5"
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  border: "none",
                  background: "rgba(255,255,255,0.8)"
                }}
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-5 position-relative">
              <i className="fas fa-check-circle position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input
                type="password"
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="form-control ps-5"
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  border: "none",
                  background: "rgba(255,255,255,0.8)"
                }}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={saving}
              className="btn w-100 text-white fw-bold"
              style={{
                height: "55px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                boxShadow: "0 10px 25px rgba(37,99,235,0.5)",
                transition: "0.3s"
              }}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="fas fa-sync-alt me-2"></i>
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