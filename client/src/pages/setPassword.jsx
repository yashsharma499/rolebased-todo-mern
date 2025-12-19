import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function SetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing invite token");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/set-password", {
        token,
        password,
      });

      alert("Password set successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to set password. Invite may be expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center">
          Set Your Password
        </h1>

        <p className="text-sm text-slate-500 text-center">
          Create a password to activate your account
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-slate-100 rounded-xl outline-none"
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 bg-slate-100 rounded-xl outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-70"
        >
          {loading ? "Setting password..." : "Set Password"}
        </button>
      </form>
    </div>
  );
}
