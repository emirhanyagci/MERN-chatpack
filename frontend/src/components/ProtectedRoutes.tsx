import { Navigate, Outlet } from "react-router-dom";
const isAuthed = true;
export default function ProtectedRoutes() {
  if (!isAuthed) return <Navigate to="/login" />;
  return <Outlet />;
}
