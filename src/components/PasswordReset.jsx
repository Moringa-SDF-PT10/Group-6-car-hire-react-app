import { useState } from "react";
import { apiPost } from "../api";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [password, setPassword]=useState("");


function handlePassword (value){
    setPassword(value);
    return

}
 const handleReset = async (e) => {
    e.preventDefault();
    try {
      const data = await apiPost("/password-reset", { email }); 

      setMessage("If the email exists, a reset link has been sent!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordReset;
