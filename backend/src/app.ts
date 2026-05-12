import express from "express";
import cors from "cors";

import gyms from "./data/gyms";
import verifyToken from "./middleware/verifyToken";

const app = express();

// Allow requests from frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Allow the API to read JSON data
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("API running");
});

// Get all gyms
app.get("/gyms", (req, res) => {
  res.json(gyms);
});

// Get one gym by ID
app.get("/gyms/:id", (req, res) => {
  const gym = gyms.find((g) => g.id === Number(req.params.id));

  // Return 404 if gym is not found
  if (!gym) {
    return res.status(404).json({
      message: "Gym not found",
    });
  }

  res.json(gym);
});

// Protected route to create a gym
app.post("/gyms", verifyToken, (req, res) => {
  const newGym = {
    id: gyms.length + 1,
    ...req.body,
    reviews: [],
  };

  gyms.push(newGym);

  res.status(201).json(newGym);
});

// Protected route to add a review
app.post("/gyms/:id/reviews", verifyToken, (req, res) => {
  const gym = gyms.find((g) => g.id === Number(req.params.id));

  // Return 404 if gym does not exist
  if (!gym) {
    return res.status(404).json({
      message: "Gym not found",
    });
  }

  // Add review to gym
  gym.reviews.push(req.body);

  res.status(201).json({
    message: "Review added",
  });
});

// Protected profile route
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected profile data",
  });
});

export default app;