import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #3b82f6, #93c5fd)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >

      {/* HERO */}
      <div className="container py-5">
        <div className="row align-items-center">

          {/* LEFT */}
          <div className="col-md-6">
            <h1 className="fw-bold mb-3" style={{ fontSize: "46px" }}>
              📚 Smart Library <br />
              <span style={{ color: "#e0e7ff" }}>
                Management System
              </span>
            </h1>

            <p className="mb-4" style={{ opacity: 0.9 }}>
              Organize books, manage students, and track issuing seamlessly with a
              clean and powerful system built for efficiency.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link
                to="/user/login"
                className="btn text-white fw-semibold"
                style={{
                  padding: "12px 26px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.5)"
                }}
              >
                <i className="fas fa-user me-2"></i> Student Login
              </Link>

              <Link
                to="/admin/login"
                className="btn fw-semibold"
                style={{
                  padding: "12px 26px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)"
                }}
              >
                <i className="fas fa-user-shield me-2"></i> Admin Login
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="position-relative">

              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="Library"
                className="img-fluid rounded-4"
                style={{
                  height: "360px",
                  width: "100%",
                  objectFit: "cover",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
                }}
              />

              <div
                className="position-absolute px-3 py-2"
                style={{
                  bottom: "20px",
                  left: "20px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                  fontSize: "13px"
                }}
              >
                📖 Efficient Book Management
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
              icon: "fa-book",
              title: "Manage Books",
              text: "Easily add, update and track all your books.",
            },
            {
              icon: "fa-exchange-alt",
              title: "Issue & Return",
              text: "Smooth issuing and returning with fine tracking.",
            },
            {
              icon: "fa-users",
              title: "Students",
              text: "Manage all students and their records.",
            },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="p-4 text-center h-100"
                style={{
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(15px)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  transition: "0.3s"
                }}
              >
                <i className={`fas ${item.icon} fs-1 mb-3`}></i>
                <h5 className="fw-semibold">{item.title}</h5>
                <p style={{ fontSize: "14px", opacity: 0.85 }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* VISUAL */}
      <div className="container py-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              className="img-fluid rounded-4"
              alt="Books"
              style={{
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
              }}
            />
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <h4 className="fw-bold mb-3">
              📘 Simplify Your Library Workflow
            </h4>
            <p style={{ opacity: 0.9 }}>
              From issuing books to tracking returns, everything is streamlined
              in one place with a clean and intuitive interface.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="container py-5">
        <div
          className="text-center p-5"
          style={{
            borderRadius: "20px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
          }}
        >
          <h3 className="fw-bold mb-3">
            Ready to Manage Your Library Smarter?
          </h3>

          <p className="mb-4" style={{ opacity: 0.9 }}>
            Start using the system and simplify your workflow today.
          </p>

          <Link
            to="/admin/login"
            className="btn fw-semibold"
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              background: "#fff",
              color: "#1e3a8a"
            }}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-4 small" style={{ opacity: 0.8 }}>
        © {new Date().getFullYear()} ReadHub • Designed by OmY.
      </div>

    </div>
  );
};

export default Home;