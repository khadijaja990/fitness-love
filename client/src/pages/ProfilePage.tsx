import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const navigate = useNavigate();

  // Use auth context
  const { user, logout } = useAuth();

  // Logout user
  const handleLogout = async () => {
    await logout();

    navigate("/");
  };

  return (
    <div className="page">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="logo">
          FITNESS LOVE
        </h1>

        <div className="nav-links">
          <Link to="/">
            <button className="nav-button">
              Gyms
            </button>
          </Link>

          <Link to="/profile">
            <button className="nav-button">
              Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Profile box */}
      <div
        style={{
          maxWidth: "500px",
          margin: "100px auto",
        }}
      >
        <div className="form-box">
          <h2
            style={{
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Member Profile
          </h2>

          {/* Profile image */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={
                user?.photoURL ||
                "https://i.pravatar.cc/120"
              }
              alt="profile"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: "3px solid #20d3a6",
              }}
            />
          </div>

          {/* User name */}
          <div style={{ marginBottom: "20px" }}>
            <p
              style={{
                color: "#20d3a6",
                marginBottom: "5px",
              }}
            >
              Full Name
            </p>

            <h3>
              {user?.displayName || "Guest"}
            </h3>
          </div>

          {/* User email */}
          <div style={{ marginBottom: "20px" }}>
            <p
              style={{
                color: "#20d3a6",
                marginBottom: "5px",
              }}
            >
              Email Address
            </p>

            <h3>
              {user?.email || "No email"}
            </h3>
          </div>

          {/* Membership */}
          <div style={{ marginBottom: "30px" }}>
            <p
              style={{
                color: "#20d3a6",
                marginBottom: "5px",
              }}
            >
              Membership
            </p>

            <h3>Premium Member</h3>
          </div>

          {/* Logout button */}
          <button
            className="primary-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;