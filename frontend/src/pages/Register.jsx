import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://lost-found-backend-slyy.onrender.com";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/auth/register`,
        form
      );

      alert("Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>✨ Register</h2>

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

        <button type="submit">Register</button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;