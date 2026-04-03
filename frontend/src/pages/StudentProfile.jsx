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
      style={{ marginBottom: "60px" }}
    >
      <div>
        <h3
          className="fw-bold d-flex align-items-center gap-3 mb-2"
          style={{ fontSize: "26px", letterSpacing: "0.5px" }}
        >
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-4"
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #0d6efd, #3b82f6)",
              boxShadow: "0 10px 25px rgba(13,110,253,0.3)"
            }}
          >
            <i className="fas fa-user-graduate text-white fs-4"></i>
          </span>
          Profile
        </h3>

        <p
          className="fw-semibold mb-0"
          style={{
            color: "#6c757d",
            fontSize: "15px"
          }}
        >
          Manage and update your personal details easily.
        </p>
      </div>

      <p
        className="mt-3 fw-semibold"
        style={{
          fontSize: "15px",
          background: "#ffffff",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}
      >
        Welcome {studentUser.full_name || "guest"}
      </p>
    </div>

    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-12">

        <div
          className="card border-0 rounded-4"
          style={{
            boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
            borderRadius: "18px",
            overflow: "hidden"
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "40px 35px"
            }}
          >
            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Student Id
                </label>
                <input
                  type="text"
                  name="student_id"
                  value={profile.student_id}
                  readOnly
                  className="form-control bg-light"
                  style={{
                    height: "48px",
                    borderRadius: "10px",
                    border: "1px solid #e9ecef",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    height: "48px",
                    borderRadius: "10px",
                    border: "1px solid #dee2e6",
                    fontSize: "14px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  readOnly
                  className="form-control bg-light"
                  style={{
                    height: "48px",
                    borderRadius: "10px",
                    border: "1px solid #e9ecef",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div className="mb-5">
                <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleChange}
                  className="form-control"
                  maxLength={10}
                  style={{
                    height: "48px",
                    borderRadius: "10px",
                    border: "1px solid #dee2e6",
                    fontSize: "14px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className={`btn ${saving ? 'btn-secondary' : 'btn-primary'} w-100 bg-primary text-white`}
                style={{
                  height: "50px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 20px rgba(13,110,253,0.35)",
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
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-save me-2"></i>
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
</div>
  )
}

export default StudentProfile