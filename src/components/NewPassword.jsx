import { useState } from "react";
import { useParams } from "react-router-dom";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { token } = useParams(); 

  const handleNewPassword = async (e) => {
    e.preventDefault();
    
    // Validate that passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`https://group-6-car-hire-react-app.onrender.com/update-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error("Failed to update password.");
      setMessage("Your password has been successfully reset!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h1>Set New Password</h1>
      <form onSubmit={handleNewPassword}>
        <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Update Password</button>
      </form>
      {message && <p style={{ color: message === "Your password has been successfully reset!" ? "green" : "red" }}>{message}</p>}
    </div>
  );
}

export default NewPassword;
