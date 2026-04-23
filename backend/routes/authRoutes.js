import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://lost-found-backend-slyy.onrender.com";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful 🚀");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>🔐 Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>

        <p>
          New user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;