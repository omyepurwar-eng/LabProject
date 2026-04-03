import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
        minHeight: "100vh",
      }}
    >

      {/* HERO SECTION */}
      <div className="container py-5">
        <div className="row align-items-center">

          {/* LEFT */}
          <div className="col-md-6">
            <h1 className="fw-bold mb-3" style={{ fontSize: "42px" }}>
              📚 Smart Library <br />
              <span className="text-primary">Management System</span>
            </h1>

            <p className="text-muted mb-4">
              Organize books, manage students, and track issuing seamlessly with a
              clean and powerful system built for efficiency.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link to="/user/login" className="btn btn-primary px-4 py-2 shadow">
                <i className="bi bi-person me-1"></i> Student Login
              </Link>

              <Link
                to="/admin/login"
                className="btn btn-outline-primary px-4 py-2"
              >
                <i className="bi bi-shield-lock me-1"></i> Admin Login
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="position-relative">

              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="Library"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  objectFit: "cover",
                  height: "350px",
                  width: "100%",
                }}
              />

              {/* Floating Badge */}
              <div
                className="position-absolute bg-white shadow rounded-3 px-3 py-2"
                style={{
                  bottom: "15px",
                  left: "15px",
                }}
              >
                <small className="text-muted">
                  📖 Efficient Book Management
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5">
        <h4 className="text-center fw-semibold mb-5">
          ✨ Powerful Features
        </h4>

        <div className="row g-4">

          {[
            {
              icon: "bi-book",
              title: "Manage Books",
              text: "Easily add, update and track all your books.",
              color: "primary",
            },
            {
              icon: "bi-arrow-left-right",
              title: "Issue & Return",
              text: "Smooth issuing and returning with fine tracking.",
              color: "success",
            },
            {
              icon: "bi-people",
              title: "Students",
              text: "Manage all students and their records.",
              color: "warning",
            },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-0 shadow-lg rounded-4 h-100 text-center p-4 hover-card">
                <i className={`bi ${item.icon} fs-1 text-${item.color} mb-3`}></i>
                <h5 className="fw-semibold">{item.title}</h5>
                <p className="text-muted small">{item.text}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* VISUAL SECTION */}
      <div className="container py-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              className="img-fluid rounded-4 shadow"
              alt="Books"
            />
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <h4 className="fw-bold mb-3">
              📘 Simplify Your Library Workflow
            </h4>
            <p className="text-muted">
              From issuing books to tracking returns, everything is streamlined
              in one place with a clean and intuitive interface.
            </p>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="container py-5">
        <div
          className="card border-0 shadow-lg rounded-4 text-center p-5"
          style={{
            background: "linear-gradient(135deg, #0d6efd, #6610f2)",
            color: "white",
          }}
        >
          <h3 className="fw-bold mb-3">
            Ready to Manage Your Library Smarter?
          </h3>

          <p className="mb-4">
            Start using the system and simplify your workflow today.
          </p>

          <Link to="/admin/login" className="btn btn-light px-4">
            Get Started
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-4 small text-muted">
        © {new Date().getFullYear()} ReadHub • Designed by OmY.
      </div>

      {/* HOVER EFFECT */}
      <style>
        {`
          .hover-card {
            transition: all 0.3s ease;
          }

          .hover-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
        `}
      </style>

    </div>
  );
};

export default Home;