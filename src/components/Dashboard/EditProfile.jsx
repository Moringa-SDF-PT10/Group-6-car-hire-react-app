import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiGet, apiPut } from "../../api";

function EditProfile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.email) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const data = await apiGet(`/users/${user.id}`); 
        setProfile({ name: data.name || "", email: data.email || "" });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile info.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user.id, user.email]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await apiPut(`/users/${user.id}`, profile);

      localStorage.setItem("user", JSON.stringify(profile));

      toast.success("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("❌ Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div>
          <label htmlFor="name">Name:</label><br />
          <input
            id="name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            required
            disabled={saving}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            required
            disabled={saving}
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
