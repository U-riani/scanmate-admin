// frontend/src/pages/login/Login.jsx

import { useState, useEffect } from "react";
import { authenticate } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    try {
      const loggedUser = authenticate(email, password);
      setUser(loggedUser);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold">Scanmate Admin</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700">
          Login
        </button>
      </form>
    </div>
  );
}