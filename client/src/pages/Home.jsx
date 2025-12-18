// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// logo image
import cartLogo from "../assets/cart-logo.png";

// category icons
import { FaMobileAlt, FaLaptop, FaHeadphones, FaHome } from "react-icons/fa";

/* ---------- CATEGORY ICON BOX ---------- */
function CategoryIcon({ Icon }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 12,
        background: "linear-gradient(135deg, #0ea5e9, #7c3aed)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        color: "white",
      }}
    >
      <Icon />
    </div>
  );
}

/* ---------- MAIN HOME COMPONENT ---------- */
export default function Home({ isLoggedIn }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/reviews", { state: { search: searchTerm } });
  };

  return (
    <div
      style={{
        padding: 20,
        color: "#e6eef8",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      

      {/* ================= SEARCH ================= */}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 26,
          maxWidth: 820,
        }}
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search product / title / text..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(8,10,15,0.6)",
            color: "#dbeafe",
          }}
        />
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>

      {/* ================= HERO ================= */}
      <section
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 30,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 34, margin: 0 }}>
            Stop trusting{" "}
            <span style={{ color: "#7c3aed" }}>fake product reviews.</span>
          </h2>

          <p style={{ color: "#a9bbcc", marginTop: 10 }}>
            CompareCarts collects honest reviews from real buyers — see how
            products perform <strong>after months of use</strong>.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Start posting reviews
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link to="/post-review" className="btn btn-primary">
                  Post a new review
                </Link>
                <Link to="/reviews" className="btn btn-secondary">
                  Browse reviews
                </Link>
              </>
            )}
          </div>

          <div style={{ display: "flex", gap: 22, marginTop: 22 }}>
            <div>
              <div style={{ fontSize: 12, color: "#9aa7bb" }}>
                Verified purchases
              </div>
              <div style={{ fontWeight: 700 }}>1,200+</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#9aa7bb" }}>
                Avg review length
              </div>
              <div style={{ fontWeight: 700 }}>180+ words</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#9aa7bb" }}>
                Sponsored content
              </div>
              <div style={{ fontWeight: 700 }}>None</div>
            </div>
          </div>
        </div>

        {/* Snapshot card */}
        <aside
          style={{
            width: 340,
            background: "#071023",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <h4 style={{ marginTop: 0 }}>Sample Product Snapshot</h4>
          <p style={{ fontSize: 13, color: "#9aa7bb" }}>
            Example of a community review summary.
          </p>

          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Noise-Cancelling Headphones</strong>
              <span>⭐ 4.6</span>
            </div>
            <div style={{ fontSize: 13, color: "#9aa7bb", marginTop: 6 }}>
              Comfort • Battery
            </div>
            <div style={{ fontSize: 13, marginTop: 10, color: "#9aa7bb" }}>
              ✓ 19 verified reviews · Avg usage 3 months
            </div>
          </div>
        </aside>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section style={{ marginBottom: 26 }}>
        <h3>Explore categories</h3>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { name: "Mobiles", icon: FaMobileAlt },
            { name: "Laptops", icon: FaLaptop },
            { name: "Audio", icon: FaHeadphones },
            { name: "Home", icon: FaHome },
          ].map((c) => (
            <Link
              key={c.name}
              to="/reviews"
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                padding: 14,
                background: "#051021",
                borderRadius: 12,
                color: "#e6eef8",
                textDecoration: "none",
                minWidth: 260,
              }}
            >
              <CategoryIcon Icon={c.icon} />

              <div>
                <div style={{ fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: "#9aa7bb" }}>
                  Real reviews, no ads
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section>
        <h3>Why CompareCarts?</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginTop: 10,
          }}
        >
          {[
            {
              title: "Genuine reviews",
              text: "Long-term usage feedback, not just day-one impressions.",
            },
            {
              title: "Category browsing",
              text: "Focused lists for Mobiles, Laptops, Audio and more.",
            },
            {
              title: "Your voice matters",
              text: "Help others buy smarter with honest experiences.",
            },
            {
              title: "Clean interface",
              text: "Minimalist, readable and distraction-free.",
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: "#061026",
                padding: 14,
                borderRadius: 10,
              }}
            >
              <div style={{ fontWeight: 700 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#99aebf", marginTop: 6 }}>
                {f.text}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
