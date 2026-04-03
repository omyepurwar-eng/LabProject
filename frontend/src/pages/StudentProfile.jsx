import React , {useState,useEffect,} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';


const StudentProfile = () => {
    
    const [profile, setProfile] = useState({
        student_id : "",
        full_name : "",
        email : "",
        mobile : "",
    });
   
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

useEffect(() => {
        if (!studentUser) {
            navigate("/user/login");
            return;
        }   
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/api/user/profile/",{
                params :{ student_id: studentUser.student_id}
            });
            setProfile({
                student_id: response.data.student_id,
                full_name: response.data.full_name,
                email: response.data.email,
                mobile: response.data.mobile,

            });
        }catch (err) {
            console.error(err);
            toast.error("Failed to fetch profile .");
        }finally {
            setLoading(false);
        }
    };

    fetchProfile();
}, []);

    const handleChange = (e) => {
        const{ name , value } = e.target;
        setProfile((prevProfile)=>({
            ...prevProfile,
            [name]:value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            setSaving(true);
            await axios.put("http://127.0.0.1:8000/api/user/profile/",{
                student_id:profile.student_id,
                full_name:profile.full_name,
                mobile:profile.mobile,
            });
            toast.success("Profile Updated SuccessFully")

            const updatedUser = {...studentUser,full_name: profile.full_name}
            localStorage.setItem("studentUser",JSON.stringify(updatedUser))

        }catch (err) {
            console.error(err)
            toast.error("Failed To Update Profile.")
        }finally{
            setSaving(false);
        }

    }

    if (loading){
      return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading..</span>

          </div>
        </div>
      );
    }




 return (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0e7ff, #f8fafc)",
      padding: "100px 20px",
    }}
  >
    <div className="container">

      {/* Header */}
      <div className="text-center mb-5">
        <h2
          className="fw-bold"
          style={{
            fontSize: "32px",
            background: "linear-gradient(90deg,#0d6efd,#6610f2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}
        >
          Student Profile
        </h2>
        <p className="text-muted mt-2">
          Manage your personal information smoothly
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">

          {/* CARD */}
          <div
            className="card border-0"
            style={{
              borderRadius: "20px",
              backdropFilter: "blur(18px)",
              background: "rgba(255,255,255,0.7)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
              overflow: "hidden",
            }}
          >
            <div className="card-body p-5">

              {/* Avatar */}
              <div className="text-center mb-4">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    margin: "0 auto",
                    background: "linear-gradient(135deg,#0d6efd,#6610f2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 25px rgba(13,110,253,0.4)"
                  }}
                >
                  <i className="fas fa-user text-white fs-3"></i>
                </div>
                <h5 className="mt-3 fw-semibold">
                  {studentUser.full_name || "Guest"}
                </h5>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Student ID */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Student ID</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="fas fa-id-card text-primary"></i>
                    </span>
                    <input
                      type="text"
                      name="student_id"
                      value={profile.student_id}
                      readOnly
                      className="form-control bg-light"
                      style={{ height: "50px", borderRadius: "10px" }}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="fas fa-user text-primary"></i>
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      value={profile.full_name}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        height: "50px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                      }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="fas fa-envelope text-primary"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      readOnly
                      className="form-control bg-light"
                      style={{ height: "50px", borderRadius: "10px" }}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Mobile</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="fas fa-phone text-primary"></i>
                    </span>
                    <input
                      type="number"
                      name="mobile"
                      value={profile.mobile}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        height: "50px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                      }}
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={saving}
                  className={`btn w-100 ${
                    saving ? "btn-secondary" : "btn-primary"
                  }`}
                  style={{
                    height: "52px",
                    borderRadius: "14px",
                    fontWeight: "600",
                    fontSize: "15px",
                    boxShadow: "0 10px 25px rgba(13,110,253,0.4)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save Changes
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* Extra UI polish */}
    <style>
      {`
        .form-control:focus {
          box-shadow: 0 0 0 0.15rem rgba(13,110,253,0.25);
          border-color: #0d6efd;
        }

        .btn:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .card {
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
        }
      `}
    </style>
  </div>
);
}

export default StudentProfile