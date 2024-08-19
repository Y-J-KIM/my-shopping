import React, { useState } from "react";
import "./Login.css";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
=======
import { useAuth } from "../AuthContext";

const Login = () => {
  const [mid, setMid] = useState("");
  const [mpw, setMpw] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
>>>>>>> f230fdaa703e39289c5282be11247cae90424d9d

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
<<<<<<< HEAD
      const response = await axios.post('http://localhost:8080/api/users/login', null, {
        params: { userId, password }
      });

      if (response.status === 200) {
        // 로그인 성공 시
        alert('Login successful!');
        navigate('/');
      }
    } catch (error) {
      alert('Invalid credentials');
=======
      await login({ mid, mpw });
    } catch (err) {
      setError("Invalid id or password");
    } finally {
      setLoading(false);
>>>>>>> f230fdaa703e39289c5282be11247cae90424d9d
    }
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <Link to="/member/join" className="join-text">
              Join
            </Link>
            <button type="submit">Login</button>
          </div>
<<<<<<< HEAD
=======
          {error && <p>{error}</p>}
>>>>>>> f230fdaa703e39289c5282be11247cae90424d9d
        </form>
      </div>
    </div>
  );
};

export default Login;
