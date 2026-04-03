import React from 'react'
import { Link , useLocation , useNavigate } from 'react-router-dom'
import ReadHub from "../assets/ReadHub.png";
import "bootstrap-icons/font/bootstrap-icons.css";




const Header = () => { 
  const location = useLocation();
  const adminUser = localStorage.getItem("adminUser");
  const studentUser = localStorage.getItem("studentUser");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  }

   const handleStudentLogout = () => {
    localStorage.removeItem("studentUser");
    navigate("/user/login");
  }



  const isActivate = (path) => 
     location.pathname === path ? "active text-primary fw-semibold" : "";
  

  return (
   <nav
  className="navbar navbar-expand-lg"
  style={{
    paddingTop: "10px",
    paddingBottom: "10px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    background: "linear-gradient(90deg,#ffffff,#f1f5ff)"
  }}
>
  <div className="container">

    {/* Logo */}
    <Link
      className="navbar-brand d-flex align-items-center gap-2"
      to="/"
    >
      <img
        src={ReadHub}
        alt="Logo"
        style={{
          height: "42px",
          objectFit: "contain"
        }}
      />
      <span
        className="fw-bold"
        style={{
          fontSize: "22px",
          letterSpacing: "0.5px",
          color: "#0d6efd"
        }}
      >
        ReadHub
      </span>
    </Link>

    {/* Toggle */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      style={{ border: "none", boxShadow: "none" }}
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul
        className="navbar-nav ms-auto mb-2 mb-lg-0"
        style={{
          alignItems: "center",
          gap: "10px"
        }}
      >

        {/* ================= PUBLIC ================= */}
        {!adminUser && !studentUser && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActivate('/')}`}
                to="/"
                style={{ padding: "8px 16px", borderRadius: "10px" }}
              >
                <i className="fa-solid fa-house me-2"></i>Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActivate('/user/login')}`}
                to="/user/login"
                style={{ padding: "8px 16px", borderRadius: "10px" }}
              >
                <i className="fa-solid fa-user me-2"></i>User Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActivate('/user/signup')}`}
                to="/user/signup"
                style={{ padding: "8px 16px", borderRadius: "10px" }}
              >
                <i className="fa-solid fa-user-plus me-2"></i>User Signup
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="btn btn-primary"
                to="/admin/login"
                style={{
                  padding: "8px 18px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  boxShadow: "0 6px 18px rgba(13,110,253,0.35)"
                }}
              >
                <i className="fa-solid fa-shield-halved me-2"></i>
                Admin Login
              </Link>
            </li>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {adminUser && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActivate("/admin/dashboard")}`}
                to="/admin/dashboard"
                style={{ padding: "8px 16px", borderRadius: "10px" }}
              >
                <i className="fa-solid fa-gauge me-2"></i>
                Dashboard
              </Link>
            </li>

            {/* Categories */}
            <li className="nav-item dropdown">
              <button
                className="btn nav-link"
                data-bs-toggle="dropdown"
                style={{ padding: "8px 16px" }}
              >
                <i className="fa-solid fa-layer-group me-2"></i>
                Categories
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                <li>
                  <Link className="dropdown-item" to="/admin/category/add">
                    <i className="fa-solid fa-plus me-2"></i>Add Category
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/category/manage">
                    <i className="fa-solid fa-gear me-2"></i>Manage Category
                  </Link>
                </li>
              </ul>
            </li>

            {/* Author */}
            <li className="nav-item dropdown">
              <button
                className="btn nav-link"
                data-bs-toggle="dropdown"
                style={{ padding: "8px 16px" }}
              >
                <i className="fa-solid fa-pen-nib me-2"></i>
                Author
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                <li>
                  <Link className="dropdown-item" to="/admin/author/add">
                    <i className="fa-solid fa-plus me-2"></i>Add Author
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/author/manage">
                    <i className="fa-solid fa-gear me-2"></i>Manage Author
                  </Link>
                </li>
              </ul>
            </li>

            {/* Books */}
            <li className="nav-item dropdown">
              <button
                className="btn nav-link"
                data-bs-toggle="dropdown"
                style={{ padding: "8px 16px" }}
              >
                <i className="fa-solid fa-book me-2"></i>
                Books
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                <li>
                  <Link className="dropdown-item" to="/admin/book/add">
                    <i className="fa-solid fa-plus me-2"></i>Add Book
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/book/manage">
                    <i className="fa-solid fa-book me-2"></i>Manage Books
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/manage-issued-books">
                    <i className="fa-solid fa-book-open me-2"></i>Issued Books
                  </Link>
                </li>
              </ul>
            </li>

            {/* Actions */}
            <li className="nav-item">
              <Link className={`nav-link ${isActivate("/admin/issue-book")}`} to="/admin/issue-book">
                <i className="fa-solid fa-book-open me-2"></i>Issue Books
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActivate("/admin/manage_students")}`} to="/admin/manage_students">
                <i className="fa-solid fa-users me-2"></i>Students
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActivate("/admin/change_password")}`} to="/admin/change_password">
                <i className="fa-solid fa-key me-2"></i>Change Password
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
                style={{
                  borderRadius: "10px",
                  padding: "6px 16px"
                }}
              >
                <i className="fa-solid fa-right-from-bracket me-2"></i>
                Logout
              </button>
            </li>
          </>
        )}

        {/* ================= STUDENT ================= */}
        {studentUser && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/user/dashboard">
                <i className="fa-solid fa-gauge me-2"></i>Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/user/books">
                <i className="fa-solid fa-book me-2"></i>My Library
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/user/issued-books">
                <i className="fa-solid fa-book-open me-2"></i>Issued Books
              </Link>
            </li>

            <li className="nav-item dropdown">
              <button className="btn nav-link" data-bs-toggle="dropdown">
                <i className="fa-solid fa-circle-user me-2"></i>My Account
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                <li>
                  <Link className="dropdown-item" to="/user/profile">
                    <i className="fa-solid fa-user me-2"></i>Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/user/change_password">
                    <i className="fa-solid fa-key me-2"></i>Change Password
                  </Link>
                </li>

                <hr className="dropdown-divider" />

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleStudentLogout}
                  >
                    <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </li>
          </>
        )}

      </ul>
    </div>
  </div>
</nav>
  )
}

export default Header
