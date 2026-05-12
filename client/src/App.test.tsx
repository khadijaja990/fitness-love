import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("Frontend UI tests", () => {
  // Check login button
  it("should show login button when user is not logged in", () => {
    render(<App />);

    expect(screen.getByText("Login with Google")).toBeInTheDocument();
  });

  // Check app title
  it("should show app title", () => {
    render(<App />);

    expect(screen.getByText("Gym Review App")).toBeInTheDocument();
  });

  // Check login button exists
  it("should render login button", () => {
    render(<App />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  // Check gyms are not visible before login
  it("should not show gym cards before login", () => {
    render(<App />);

    expect(screen.queryByText("Fit Gym")).not.toBeInTheDocument();
  });

  // Check logout button is hidden before login
  it("should not show logout button before login", () => {
    render(<App />);

    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });
});