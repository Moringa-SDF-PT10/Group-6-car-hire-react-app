import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset";
import NewPassword from "./NewPassword"; 
import CarList from "./CarList";
import "../index.css"; 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
         <Route path="/update-password/:token" element={<NewPassword />} />
        <Route path="/cars" element={<CarList />} />
      </Routes>
    </Router>
  );
}

export default App;

