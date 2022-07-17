import { Route, Routes } from "react-router-dom";
import { Business } from "./pages/client/Business";
import { Service } from "./pages/client/Service";
import { Home } from "./pages/client/Home";
import { EditProfile } from "./pages/client/Profile/EditProfile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Welcome } from "./pages/Welcome";
import { Favorites } from "./pages/client/Favorites/Favorites";
import { Budget } from "./pages/client/Budget";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/business" element={<Business />} />
      <Route path="/service" element={<Service />} />
      <Route path="/profile" element={<EditProfile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/budget" element={<Budget />} />
    </Routes>
  );
}