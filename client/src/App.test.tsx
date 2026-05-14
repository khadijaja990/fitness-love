import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

// Frontend unit tests
describe("Frontend UI tests", () => {
  // Helper render function
  const renderApp = () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
  };

  // Check login before authentication
  it("should show login button when user is not logged in", () => {
    renderApp();

    expect(
      screen.getByText(/join us/i)
    ).toBeInTheDocument();
  });

  // Check application title
  it("should show app title", () => {
    renderApp();

    expect(
      screen.getByText(/fitness love/i)
    ).toBeInTheDocument();
  });

  // Check buttons are rendered
  it("should render button", () => {
    renderApp();

    expect(
      screen.getAllByRole("button").length
    ).toBeGreaterThan(0);
  });

  // Check gyms section title
  it("should show gyms section", () => {
    renderApp();

    expect(
      screen.getByText(/all gyms/i)
    ).toBeInTheDocument();
  });

  // Check logout button 
  it("should not show logout button before login", () => {
    renderApp();

    expect(
      screen.queryByText(/logout/i)
    ).not.toBeInTheDocument();
  });
});