// src/components/auth/ModuleRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function ModuleRoute({ module, children }) {

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const allowed = user.role?.modules?.[module];

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}