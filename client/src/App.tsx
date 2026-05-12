import { BrowserRouter, Routes, Route } from "react-router-dom";

import GymsPage from "./pages/GymsPage";
import GymDetailsPage from "./pages/GymDetailsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GymsPage />} />
        <Route path="/gyms/:id" element={<GymDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;