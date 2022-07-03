import { Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/Welcome";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
    </Routes>
  );
}