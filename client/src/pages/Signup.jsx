import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup({ onAuthSuccess, isLoggedIn, apiUrl }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        onAuthSuccess({ user: data.user, token: data.token });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="section-title">Create your account</h2>
      <p className="section-subtitle">
        Join CompareCarts and share your product experiences.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full name</label>
          <input
            placeholder="Your name… 😉"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p style={{ color: "tomato", fontSize: "0.85rem", marginBottom: 8 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p style={{ fontSize: "0.8rem", marginTop: 10, color: "#9ca3af" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#38bdf8" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
