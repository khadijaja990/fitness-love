import { Link, useParams } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import { useAuth } from "../context/AuthContext";

function GymDetailsPage() {
  const { id } = useParams();

  // Use auth context
  const { user, login } = useAuth();

  const [review, setReview] = useState("");

  // Submit review
  const submitReview = async () => {
    if (!review) {
      alert("Please write a review");

      return;
    }

    if (!user) {
      alert("Please login first");

      return;
    }

    try {
      const token = await user.getIdToken();

      await axios.post(
        `http://localhost:3000/gyms/${id}/reviews`,
        {
          user: user.displayName,
          comment: review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review submitted");

      setReview("");
    } catch (error) {
      console.log(error);

      alert("Failed to submit review");
    }
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

          {user ? (
            <Link to="/profile">
              <button className="nav-button">
                Profile
              </button>
            </Link>
          ) : (
            <button
              className="nav-button"
              onClick={login}
            >
              Join Us
            </button>
          )}
        </div>
      </div>

      {/* Gym details */}
      <div
        style={{
          background: "#0b1727",
          border: "1px solid #1f3a52",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "40px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
          alt="gym"
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
          }}
        />

        <div style={{ padding: "30px" }}>
          <h1
            style={{
              marginBottom: "10px",
            }}
          >
            Fit Gym #{id}
          </h1>

          <p
            style={{
              color: "#bdbdbd",
              marginBottom: "20px",
            }}
          >
            Stockholm, Sweden
          </p>

          <p
            style={{
              lineHeight: "1.8",
              color: "#d0d0d0",
            }}
          >
            Modern gym with cardio equipment,
            strength training area, personal
            trainers, and group fitness classes.
          </p>
        </div>
      </div>

      {/* Reviews */}
      <h2 className="section-title">
        Member Reviews
      </h2>

      <div className="gym-grid">
        <div className="gym-card">
          <div className="gym-content">
            <h3
              style={{
                marginBottom: "10px",
              }}
            >
              Sarah
            </h3>

            <p>
              Very clean gym with excellent
              equipment and friendly staff.
            </p>
          </div>
        </div>

        <div className="gym-card">
          <div className="gym-content">
            <h3
              style={{
                marginBottom: "10px",
              }}
            >
              Alex
            </h3>

            <p>
              Great atmosphere and good fitness
              classes. Highly recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Review section */}
      <div
        style={{
          marginTop: "50px",
          maxWidth: "500px",
        }}
      >
        {user ? (
          <div className="form-box">
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Write a Review
            </h2>

            <textarea
              placeholder="Write your review..."
              className="input"
              rows={5}
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
            />

            <button
              className="primary-btn"
              onClick={submitReview}
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="form-box">
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              Join Our Community
            </h2>

            <p
              style={{
                color: "#d0d0d0",
                lineHeight: "1.8",
                marginBottom: "20px",
              }}
            >
              Login to write reviews and share
              your fitness experience with other
              members.
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
    </div>
  );
}

export default GymDetailsPage;