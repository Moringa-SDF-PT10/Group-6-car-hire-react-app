import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateProfile } from "../components/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user.id, formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Your Profile</h1>
      {success && <p>Profile updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
