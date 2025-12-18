import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostReview from "./pages/PostReview";
import ViewReviews from "./pages/ViewReviews";
import About from "./pages/About";
import Contact from "./pages/Contact";

const API_URL = "http://localhost:5000";

function RequireAuth({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("cc_user") || "null") // cc = comparecarts
  );
  const [token, setToken] = useState(() => localStorage.getItem("cc_token"));
  const [reviews, setReviews] = useState([]);

  const isLoggedIn = !!token;

  const handleAuthSuccess = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("cc_user", JSON.stringify(user));
    localStorage.setItem("cc_token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("cc_user");
    localStorage.removeItem("cc_token");
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Router>
      <div className="app-shell">
        {/* Navbar */}
        <header className="app-header">
          <div>
            <Link to="/" className="nav-link" style={{ padding: 0 }}>
              <h1 className="brand-title">CompareCarts</h1>
            </Link>
            <div className="brand-tagline">
              Compare real experiences before you spend your money.
            </div>
          </div>

          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/reviews" className="nav-link">
              Browse Reviews
            </Link>
            <Link to="/post-review" className="nav-link">
              Post Review
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link-primary nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-link">
                  Sign up
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout {user?.name ? `(${user.name})` : ""}
              </button>
            )}
          </nav>
        </header>

        {/* Content */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

            <Route
              path="/login"
              element={
                <Login
                  onAuthSuccess={handleAuthSuccess}
                  isLoggedIn={isLoggedIn}
                  apiUrl={API_URL}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  onAuthSuccess={handleAuthSuccess}
                  isLoggedIn={isLoggedIn}
                  apiUrl={API_URL}
                />
              }
            />

            <Route
              path="/reviews"
              element={<ViewReviews reviews={reviews} />}
            />

            <Route
              path="/post-review"
              element={
                <RequireAuth isLoggedIn={isLoggedIn}>
                  <PostReview
                    apiUrl={API_URL}
                    token={token}
                    onReviewSaved={fetchReviews}
                  />
                </RequireAuth>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="app-footer">
          © {new Date().getFullYear()} CompareCarts. Built with ❤️ for genuine
          reviews.
        </footer>
      </div>
    </Router>
  );
}

export default App;
