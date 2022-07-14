import { Route, Routes } from "react-router-dom";
import { Business } from "./pages/client/Business";
import { Service } from "./pages/client/Business/Service";
import { Home } from "./pages/client/Home";
import { EditProfile } from "./pages/client/Profile/EditProfile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Welcome } from "./pages/Welcome";

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
    </Routes>
  );
}