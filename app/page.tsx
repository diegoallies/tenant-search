"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./main.globals.css";
import { FaUserAlt, FaKey } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = require("./api/users.json");
    setUsers(userData.users);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      setError(null);
      localStorage.setItem("userLogged", JSON.stringify(validUser));
      await router.prefetch("/Tenant");
      router.push("/Tenant");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="maindiv">
      <div className="bg-container">
        <div className="bg-text">
          <h3>Arealytics</h3> <h6>Advanced Real Estate Analytics</h6>{" "}
        </div>
      </div>
      <div className="login-container">
        <div className="login-box">
          <h1 className="title">Login</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                className="input"
              />
            </div>

            <div className="input-group">
              <FaKey className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="input"
              />
            </div>

            <input type="submit" value="Submit" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}
