import React, { useState } from "react";
import "./Login.css";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
const Login = () => {
  const [mid, setMid] = useState(""); // email을 mid로 변경
  const [mpw, setMpw] = useState(""); // password를 mpw로 변경
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ mid, mpw });
    } catch (err) {
      setError("Invalid id or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mid">ID:</label>
            <input
              type="text"
              id="mid"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={mpw}
              onChange={(e) => setMpw(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <Link to="/member/join" className="join-text">
              Join
            </Link>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
