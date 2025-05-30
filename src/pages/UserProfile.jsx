import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../services/api";

function UserProfile() {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.id, formData);
      login(updatedUser);
      setSuccess("Profile updated successfully");
      setError("");
      setFormData(prev => ({ ...prev, password: "" }));
    } catch (err) {
      setError(`Failed to update profile: ${err.message}`);
      setSuccess("");
    }
  };

  if (!user) return <div>Please log in to edit profile</div>;

  return (
    <div className="user-profile">
      <h2>Edit Profile</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Leave blank to keep current"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UserProfile;
