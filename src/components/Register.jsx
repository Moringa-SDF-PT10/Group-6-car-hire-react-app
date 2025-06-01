import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api.jsx";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    try {
      await apiPost("/users", newUser);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);

      toast.success("Successfully registered, you can now log in");

   // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  return (
    <div className="main-content-area">
      <h2 className="page-title">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Register;
