import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

function ProfilePage() {
  const navigate = useNavigate();

  // Logout user
  const logout = async () => {
    await signOut(auth);

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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src="https://i.pravatar.cc/120"
              alt="profile"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: "3px solid #20d3a6",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <p
              style={{
                color: "#20d3a6",
                marginBottom: "5px",
              }}
            >
              Full Name
            </p>

            <h3>Khadijah Jamshaid</h3>
          </div>

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
              khadijah@email.com
            </h3>
          </div>

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

          <button
            className="primary-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;