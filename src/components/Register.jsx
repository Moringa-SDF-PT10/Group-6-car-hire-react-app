import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api.jsx";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("")
  const navigate = useNavigate();
  

 const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Registration failed");
      return;
    }
    const newUser = {
        name,
        email,
        password
    }
    try {
      const response = await apiPost("/users",newUser)
      
      setMessage("Registration successful")
    } catch (err) {
      setError(err.message);
    }
 };

  return (
    <div>
      <h1>Register</h1>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
