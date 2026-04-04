import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
    location.pathname === path ? "hdr-active" : "";

  return (
    <>
      <nav className="navbar navbar-expand-lg hdr-navbar">
        <div className="container">

          {/* LOGO */}
          <Link className="navbar-brand hdr-brand d-flex align-items-center gap-2" to="/">
            <img src={ReadHub} alt="Logo" className="hdr-logo-img" />
            <span className="hdr-brand-name">ReadHub</span>
          </Link>

          {/* TOGGLE */}
          <button
            className="navbar-toggler hdr-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto align-items-center gap-1">

              {/* ================= PUBLIC ================= */}
              {!adminUser && !studentUser && (
                <>
                  <li className="nav-item">
                    <Link className={`hdr-nav-link ${isActivate('/')}`} to="/">
                      <i className="fa-solid fa-house"></i> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`hdr-nav-link ${isActivate('/user/login')}`} to="/user/login">
                      <i className="fa-solid fa-user"></i> User Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`hdr-nav-link ${isActivate('/user/signup')}`} to="/user/signup">
                      <i className="fa-solid fa-user-plus"></i> Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="hdr-btn-admin" to="/admin/login">
                      <i className="fa-solid fa-shield-halved"></i> Admin Login
                    </Link>
                  </li>
                </>
              )}

              {/* ================= ADMIN ================= */}
              {adminUser && (
                <>
                  <li className="nav-item">
                    <Link className={`hdr-nav-link ${isActivate("/admin/dashboard")}`} to="/admin/dashboard">
                      <i className="fa-solid fa-gauge"></i> Dashboard
                    </Link>
                  </li>

                  {/* Categories Dropdown */}
                  <li className="nav-item dropdown">
                    <button
                      className="hdr-nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-layer-group"></i> Categories
                    </button>
                    <ul className="dropdown-menu hdr-dropdown">
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/admin/category/add">➕ Add Category</Link></li>
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/admin/category/manage">⚙️ Manage Category</Link></li>
                    </ul>
                  </li>

                  {/* Author Dropdown */}
                  <li className="nav-item dropdown">
                    <button
                      className="hdr-nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-pen-nib"></i> Author
                    </button>
                    <ul className="dropdown-menu hdr-dropdown">
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/admin/author/add">➕ Add Author</Link></li>
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/admin/author/manage">⚙️ Manage Author</Link></li>
                    </ul>
                  </li>

                  {/* Books Dropdown */}
                  <li className="nav-item dropdown">
                    <button
                      className="hdr-nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-book"></i> Books
                    </button>
                    <ul className="dropdown-menu hdr-dropdown">
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/admin/book/add">➕ Add Book</Link></li>
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/admin/book/manage">📚 Manage Books</Link></li>
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/admin/manage-issued-books">📖 Issued Books</Link></li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className={`hdr-nav-link ${isActivate("/admin/issue-book")}`} to="/admin/issue-book">
                      <i className="fa-solid fa-book-open"></i> Issue Books
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={`hdr-nav-link ${isActivate("/admin/manage_students")}`} to="/admin/manage_students">
                      <i className="fa-solid fa-users"></i> Students
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={`hdr-nav-link ${isActivate("/admin/change_password")}`} to="/admin/change_password">
                      <i className="fa-solid fa-key"></i> Change Password
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button className="hdr-btn-logout" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                  </li>
                </>
              )}

              {/* ================= STUDENT ================= */}
              {studentUser && (
                <>
                  <li className="nav-item">
                    <Link className="hdr-nav-link" to="/user/dashboard">
                      <i className="fa-solid fa-gauge"></i> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="hdr-nav-link" to="/user/books">
                      <i className="fa-solid fa-book"></i> My Library
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="hdr-nav-link" to="/user/issued-books">
                      <i className="fa-solid fa-book-open"></i> Issued Books
                    </Link>
                  </li>

                  {/* My Account Dropdown */}
                  <li className="nav-item dropdown">
                    <button
                      className="hdr-nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-circle-user"></i> My Account
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end hdr-dropdown">
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/user/profile">👤 Profile</Link></li>
                      <li><Link className="dropdown-item hdr-dropdown-item" to="/user/change_password">🔑 Change Password</Link></li>
                      <li><hr className="dropdown-divider hdr-divider" /></li>
                      <li>
                        <button className="dropdown-item hdr-dropdown-item hdr-dropdown-danger" onClick={handleStudentLogout}>
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

        /* ── Navbar Base ── */
        .hdr-navbar {
          background: linear-gradient(135deg, #1a3a8f 0%, #1e56c0 50%, #3b82e8 100%) !important;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          font-family: 'Nunito', sans-serif;
          padding: 10px 0;
          position: sticky;
          top: 0;
          z-index: 1030;
        }

        /* ── Brand ── */
        .hdr-brand { text-decoration: none !important; }

        .hdr-logo-img {
          height: 36px;
          width: 36px;
          object-fit: contain;
          border-radius: 10px;
          background: rgba(255,255,255,0.18);
          padding: 4px;
        }

        .hdr-brand-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff !important;
          letter-spacing: -0.3px;
        }

        /* ── Nav Links ── */
        .hdr-nav-link {
          display: inline-flex !important;
          align-items: center;
          gap: 6px;
          padding: 7px 12px !important;
          border-radius: 10px;
          color: rgba(255,255,255,0.88) !important;
          font-size: 0.84rem !important;
          font-weight: 600 !important;
          font-family: 'Nunito', sans-serif !important;
          text-decoration: none !important;
          background: transparent !important;
          border: none;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, transform 0.15s;
          white-space: nowrap;
          line-height: 1.4;
        }

        .hdr-nav-link:hover,
        .hdr-nav-link:focus {
          background: rgba(255,255,255,0.16) !important;
          color: #fff !important;
          transform: translateY(-1px);
          outline: none;
          box-shadow: none !important;
        }

        /* Bootstrap dropdown-toggle caret color fix */
        .hdr-nav-link.dropdown-toggle::after {
          border-top-color: rgba(255,255,255,0.8) !important;
          vertical-align: 0.15em;
        }

        /* Active link */
        .hdr-active {
          background: rgba(255,255,255,0.2) !important;
          color: #fff !important;
          font-weight: 700 !important;
        }

        /* ── Dropdown Menu ── */
        .hdr-dropdown {
          background: linear-gradient(160deg, #163482 0%, #1e56c0 100%) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.18) !important;
          border-radius: 14px !important;
          padding: 8px !important;
          box-shadow: 0 12px 36px rgba(0,0,0,0.28) !important;
          min-width: 200px;
        }

        .hdr-dropdown-item {
          color: rgba(255,255,255,0.85) !important;
          font-size: 0.84rem !important;
          font-weight: 600 !important;
          font-family: 'Nunito', sans-serif !important;
          border-radius: 9px !important;
          padding: 9px 14px !important;
          transition: background 0.15s, color 0.15s;
        }

        .hdr-dropdown-item:hover,
        .hdr-dropdown-item:focus {
          background: rgba(255,255,255,0.15) !important;
          color: #fff !important;
        }

        .hdr-dropdown-danger:hover,
        .hdr-dropdown-danger:focus {
          background: rgba(255,80,80,0.25) !important;
          color: #ffb3b3 !important;
        }

        .hdr-divider {
          border-color: rgba(255,255,255,0.15) !important;
          margin: 6px 8px !important;
        }

        /* ── Admin Button ── */
        .hdr-btn-admin {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          background: #fff;
          color: #1a3a8f !important;
          font-size: 0.84rem;
          font-weight: 800;
          font-family: 'Nunito', sans-serif;
          border-radius: 12px;
          text-decoration: none !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
          border: none;
        }

        .hdr-btn-admin:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.22);
          color: #1a3a8f !important;
        }

        /* ── Logout Button ── */
        .hdr-btn-logout {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 15px;
          background: rgba(255,80,80,0.18);
          color: #ffb3b3;
          font-size: 0.84rem;
          font-weight: 700;
          font-family: 'Nunito', sans-serif;
          border: 1.5px solid rgba(255,100,100,0.35);
          border-radius: 11px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, transform 0.12s;
          white-space: nowrap;
        }

        .hdr-btn-logout:hover {
          background: rgba(255,80,80,0.35);
          color: #fff;
          transform: translateY(-1px);
        }

        /* ── Mobile Toggler ── */
        .hdr-toggler {
          background: rgba(255,255,255,0.15) !important;
          border: 1.5px solid rgba(255,255,255,0.3) !important;
          border-radius: 10px !important;
          color: #fff !important;
          padding: 6px 12px !important;
          font-size: 1rem;
        }

        .hdr-toggler:focus {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.2) !important;
        }

        /* ── Mobile collapse panel ── */
        @media (max-width: 991px) {
          .hdr-navbar .navbar-collapse {
            background: rgba(22, 52, 130, 0.98);
            border-radius: 16px;
            padding: 12px 16px;
            margin-top: 10px;
            border: 1px solid rgba(255,255,255,0.15);
          }

          .hdr-navbar .navbar-nav {
            gap: 4px !important;
            align-items: flex-start !important;
          }

          .hdr-dropdown {
            position: static !important;
            box-shadow: none !important;
            background: rgba(255,255,255,0.07) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            margin-top: 4px;
          }
        }
      `}</style>
    </>
  )
}

export default Header;