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
    location.pathname === path ? "active-link" : "";

  return (
    <>
      <nav className="navbar navbar-expand-lg glass-navbar">
        <div className="container">

          {/* LOGO */}
          <Link className="navbar-brand d-flex align-items-center gap-2 brand-logo" to="/">
            <img src={ReadHub} alt="Logo" />
            <span>ReadHub</span>
          </Link>

          {/* TOGGLE */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto nav-items">

              {/* ================= PUBLIC ================= */}
              {!adminUser && !studentUser && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActivate('/')}`} to="/">
                      <i className="fa-solid fa-house"></i> Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={`nav-link ${isActivate('/user/login')}`} to="/user/login">
                      <i className="fa-solid fa-user"></i> User Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={`nav-link ${isActivate('/user/signup')}`} to="/user/signup">
                      <i className="fa-solid fa-user-plus"></i> Signup
                    </Link>
                  </li>

                  <li className="nav-item ms-2">
                    <Link className="btn admin-btn d-flex align-items-center gap-2" to="/admin/login">
                      <i className="fa-solid fa-shield-halved"></i>
                      Admin Login
                    </Link>
                  </li>
                </>
              )}

              {/* ================= ADMIN ================= */}
              {adminUser && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActivate("/admin/dashboard")}`} to="/admin/dashboard">
                      <i className="fa-solid fa-gauge"></i> Dashboard
                    </Link>
                  </li>

                  {/* Categories */}
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-layer-group"></i> Categories
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown">
                      <li><Link className="dropdown-item" to="/admin/category/add">➕ Add Category</Link></li>
                      <li><Link className="dropdown-item" to="/admin/category/manage">⚙ Manage Category</Link></li>
                    </ul>
                  </li>

                  {/* Author */}
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-pen-nib"></i> Author
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown">
                      <li><Link className="dropdown-item" to="/admin/author/add">➕ Add Author</Link></li>
                      <li><Link className="dropdown-item" to="/admin/author/manage">⚙ Manage Author</Link></li>
                    </ul>
                  </li>

                  {/* Books */}
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-book"></i> Books
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown">
                      <li><Link className="dropdown-item" to="/admin/book/add">➕ Add Book</Link></li>
                      <li><Link className="dropdown-item" to="/admin/book/manage">📚 Manage Books</Link></li>
                      <li><Link className="dropdown-item" to="/admin/manage-issued-books">📖 Issued Books</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className={`nav-link ${isActivate("/admin/issue-book")}`} to="/admin/issue-book">
                      <i className="fa-solid fa-book-open"></i> Issue Books
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={`nav-link ${isActivate("/admin/manage_students")}`} to="/admin/manage_students">
                      <i className="fa-solid fa-users"></i> Students
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={`nav-link ${isActivate("/admin/change_password")}`} to="/admin/change_password">
                      <i className="fa-solid fa-key"></i> Change Password
                    </Link>
                  </li>

                  <li className="nav-item ms-2">
                    <button className="btn logout-btn d-flex align-items-center gap-2" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i>
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
                      <i className="fa-solid fa-gauge"></i> Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/user/books">
                      <i className="fa-solid fa-book"></i> My Library
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/user/issued-books">
                      <i className="fa-solid fa-book-open"></i> Issued Books
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-circle-user"></i> My Account
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown">
                      <li><Link className="dropdown-item" to="/user/profile">👤 Profile</Link></li>
                      <li><Link className="dropdown-item" to="/user/change_password">🔑 Change Password</Link></li>
                      <hr />
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleStudentLogout}>
                          🚪 Logout
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

      {/* STYLES */}
      <style>
        {`
        .glass-navbar {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.65);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .brand-logo img {
          height: 40px;
        }

        .brand-logo span {
          font-weight: 700;
          font-size: 22px;
          background: linear-gradient(90deg,#0d6efd,#6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-items {
          gap: 8px;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          transition: 0.3s;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: rgba(13,110,253,0.1);
          transform: translateY(-2px);
        }

        .active-link {
          background: rgba(13,110,253,0.15);
          color: #0d6efd !important;
          font-weight: 600;
        }

        .admin-btn {
          background: linear-gradient(135deg,#0d6efd,#6610f2);
          color: white;
          border-radius: 12px;
          padding: 8px 16px;
          box-shadow: 0 8px 20px rgba(13,110,253,0.4);
        }

        .admin-btn:hover {
          transform: scale(1.05);
        }

        .logout-btn {
          background: rgba(255,0,0,0.1);
          border-radius: 10px;
          padding: 8px 14px;
        }

        .logout-btn:hover {
          background: red;
          color: white;
        }

        .glass-dropdown {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.7);
          border-radius: 12px;
        }
        `}
      </style>
    </>
  )
}

export default Header;