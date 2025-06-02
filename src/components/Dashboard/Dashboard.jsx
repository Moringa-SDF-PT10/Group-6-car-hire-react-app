import { Outlet, Link, useLocation } from "react-router-dom";
import "../../index.css";

function Dashboard() {
  const location = useLocation();

  const isActive = (path) => location.pathname.endsWith(path);

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <nav className="dashboard-nav">
        <Link to="cars" className={isActive("cars") ? "active" : ""}>
          All Cars
        </Link>
        <Link to="available-cars" className={isActive("available-cars") ? "active" : ""}>
          Available Cars
        </Link>
        <Link to="bookings" className={isActive("bookings") ? "active" : ""}>
          My Bookings
        </Link>
        <Link to="edit-profile" className={isActive("edit-profile") ? "active" : ""}>
          Edit Profile
        </Link>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
