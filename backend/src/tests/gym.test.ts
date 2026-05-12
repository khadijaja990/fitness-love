import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app";

describe("Gym API integration tests", () => {
  // GET all gyms
  it("should return all gyms", async () => {
    const response = await request(app).get("/gyms");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // GET one gym
  it("should return one gym by ID", async () => {
    const response = await request(app).get("/gyms/1");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Fit Gym");
  });

  // Invalid gym ID
  it("should return 404 if gym is not found", async () => {
    const response = await request(app).get("/gyms/99");

    expect(response.status).toBe(404);
  });

  // POST without token
  it("should return 401 when creating gym without token", async () => {
    const response = await request(app).post("/gyms").send({
      name: "New Gym",
      city: "Gothenburg",
    });

    expect(response.status).toBe(401);
  });

  // POST with token
  it("should create a gym with token", async () => {
    const response = await request(app)
      .post("/gyms")
      .set("Authorization", "Bearer faketoken")
      .send({
        name: "New Gym",
        city: "Gothenburg",
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("New Gym");
  });

  // Review without token
  it("should return 401 when adding review without token", async () => {
    const response = await request(app)
      .post("/gyms/1/reviews")
      .send({
        comment: "Amazing gym",
      });

    expect(response.status).toBe(401);
  });
});