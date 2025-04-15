import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "./NavBar.css";

function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li><a href="/" className="nav-link">Log In</a></li>

        {user && (
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        )}

        {user && user.user.role === "teacher" && (
          <li><a href="/homework" className="nav-link">Homework</a></li>
        )}

        {user && user.user.role === "student" && (
          <li><a href="/home" className="nav-link">Home</a></li>
        )}

        {user && user.user.role === "office" && (
          <li><a href="/register" className="nav-link">Add</a></li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
