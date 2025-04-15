import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "../style/Reg.css";

function Register() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [subjects, setSubjects] = useState("Maths");
  const [classes, setClasses] = useState("2nd");

  const { signup, isLoading, error } = useSignup();

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:5000/user/${userId}`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        console.log(`User with ID ${userId} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password, role, subjects, classes);
    console.log("Signup submitted");
    window.location.reload();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            required
          >
            <option value="">Select a role</option>

            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="office">Office</option>
          </select>
        </div>

        <div>
          {role === "student" ||
            (role === "teacher" && (
              <>
                <label htmlFor="subjects">Subjects:</label>
                <select
                  id="subjects"
                  name="subjects"
                  value={subjects}
                  onChange={(e) => {
                    setSubjects(e.target.value);
                  }}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Maths">Maths</option>
                  <option value="French">French</option>
                  <option value="Physique">Physique</option>
                  <option value="English">English</option>
                  <option value="Sport">Sport</option>
                </select>
              </>
            ))}
          {role === "student" && (
            <>
              <label htmlFor="classe">Classe:</label>
              <select
                id="classe"
                name="classe"
                value={classes}
                onChange={(e) => {
                  setClasses(e.target.value);
                }}
                required
              >
                <option value="">Select a class</option>

                <option value="2nd">2nd</option>
                <option value="1ère">1ère</option>
                <option value="Term">Term</option>
                <option value="3e">3e</option>
                <option value="4e">4e</option>
              </select>
            </>
          )}
        </div>

        <button type="submit" disabled={isLoading}>
          Register
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      </form>

      <div className="users">
        <h2>Students</h2>
        <ul>
          {users
            .filter((user) => user.role === "student")
            .map((user) => (
              <li key={user._id}>
                {user.username} {user.classes}{" "}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </li>
            ))}
        </ul>
        <h2>Teachers</h2>
        <ul>
          {users
            .filter((user) => user.role === "teacher")
            .map((user) => (
              <li key={user._id}>
                {user.username} {user.subjects} {user.classes}{" "}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </li>
            ))}
        </ul>
        <h2>Office</h2>
        <ul>
          {users
            .filter((user) => user.role === "office")
            .map((user) => (
              <li key={user._id}>
                {user.username}{" "}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Register;
