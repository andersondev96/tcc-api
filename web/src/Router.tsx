import { Route, Routes } from "react-router-dom";
import { Business } from "./pages/client/Business";
import { Home } from "./pages/client/Home";
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
    </Routes>
  );
}