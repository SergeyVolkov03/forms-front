import { Navigate } from "react-router-dom";

export default function ProtectAuthUsersPage() {
  return <Navigate to="/" />;
}
