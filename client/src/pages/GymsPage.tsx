import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import axios from "axios";

function GymsPage() {
  const [gyms, setGyms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, login } = useAuth();

  const [gymName, setGymName] = useState("");
  const [city, setCity] = useState("");

  // Fetch gyms
  const fetchGyms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/gyms"
      );

      setGyms(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  // Add gym
  const addGym = async () => {
    if (!user) {
      alert("Please login first");

      return;
    }

    const token = await user.getIdToken();

    await axios.post(
      "http://localhost:3000/gyms",
      {
        name: gymName,
        city,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchGyms();

    setGymName("");
    setCity("");
  };

  return (
    <div className="page">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="logo">
          FITNESS LOVE
        </h1>

        <div className="nav-links">
          {!user ? (
            <button
              className="nav-button"
              onClick={login}
            >
              Login
            </button>
          ) : (
            <Link to="/profile">
              <button className="nav-button">
                Profile
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Hero section */}
      <div className="hero">
        <div className="hero-text">
          <h1>
            Find and Review
            <br />
            the <span>Best Gyms</span>
          </h1>

          <p>
            Discover gyms, read reviews, and share
            your experience with the community.
          </p>

          {user && (
            <p
              style={{
                marginTop: "20px",
                color: "#20d3a6",
                fontWeight: "bold",
              }}
            >
              Welcome {user.displayName}
            </p>
          )}
        </div>

        {/* Protected form */}
        {user ? (
          <div className="form-box">
            <h2>Add New Gym</h2>

            <input
              className="input"
              type="text"
              placeholder="Gym name"
              value={gymName}
              onChange={(e) =>
                setGymName(e.target.value)
              }
            />

            <input
              className="input"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />

            <button
              className="primary-btn"
              onClick={addGym}
            >
              Add Gym
            </button>
          </div>
        ) : (
          <div className="form-box">
            <h2>Members Area</h2>

            <p
              style={{
                color: "#d0d0d0",
                lineHeight: "1.8",
                marginBottom: "20px",
              }}
            >
              Sign in to add gyms, write
              reviews, and access member
              features.
            </p>

            <button
              className="primary-btn"
              onClick={login}
            >
              Join Us
            </button>
          </div>
        )}
      </div>

      {/* Gym cards */}
      <h2 className="section-title">
        All Gyms
      </h2>

      {loading && (
        <p
          style={{
            marginBottom: "20px",
            color: "#20d3a6",
          }}
        >
          Loading gyms...
        </p>
      )}

      <div className="gym-grid">
        {gyms.map((gym) => (
          <Link
            key={gym.id}
            to={`/gyms/${gym.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <div className="gym-card">
              <img
                className="gym-image"
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                alt="gym"
              />

              <div className="gym-content">
                <h2>{gym.name}</h2>

                <p>{gym.city}</p>

                <p
                  style={{
                    marginTop: "16px",
                    color: "#20d3a6",
                    fontWeight: "bold",
                  }}
                >
                  View Details →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GymsPage;