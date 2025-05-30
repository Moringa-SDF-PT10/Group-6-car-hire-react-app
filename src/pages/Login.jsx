import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate("/dashboard");
  }

  return (
    <div className="login">
      <h1>Login Page</h1>
      <button onClick={() => navigate("/dashboard")}>
        Simulate Login
      </button>
    </div>
  );
};

export default Login;
