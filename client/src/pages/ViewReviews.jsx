import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

function getRatingColor(rating) {
  if (rating >= 4.5) return "#22c55e";
  if (rating >= 3.5) return "#eab308";
  return "#f97316";
}

function ViewReviews({ reviews=[] }) {
  const location = useLocation();
  const initialSearch = location.state?.search || "";
  const [search, setSearch] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    // if we arrived from Home search, set that
    if (location.state?.search) {
      setSearch(location.state.search);
    }
  }, [location.state]);

  const filteredReviews = useMemo(() => {
    const term = search.toLowerCase().trim();

    return reviews.filter((r) => {
      const matchCategory =
        categoryFilter === "All" || r.category === categoryFilter;

      const matchSearch =
        !term ||
        r.productName.toLowerCase().includes(term) ||
        r.title.toLowerCase().includes(term) ||
        r.body.toLowerCase().includes(term);

      return matchCategory && matchSearch;
    });
  }, [reviews, search, categoryFilter]);

  const total = filteredReviews.length;
  const avgRating =
    total === 0
      ? 0
      : filteredReviews.reduce((sum, r) => sum + r.rating, 0) / total;

  const categories = ["All", "Mobiles", "Laptops", "Earphones", "Headphones", "Accessories", "Home Appliances", "Other"];

  return (
    <div>
      <h2 className="section-title">Browse Reviews</h2>
      <p className="section-subtitle">
        Filter by category, search by product name, and see rating insights.
      </p>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <input
          style={{ maxWidth: 260 }}
          placeholder="Search product / title / text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={{ maxWidth: 180 }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Analysis */}
      <div className="card" style={{ marginBottom: 18 }}>
        <h4 className="card-title" style={{ marginBottom: 8 }}>
          Summary for current view
        </h4>
        {total === 0 ? (
          <p className="card-text">
            No reviews match your filters/search right now.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              fontSize: "0.85rem",
            }}
          >
            <div>
              <div className="hero-metric-label">Total reviews shown</div>
              <div className="hero-metric-value">{total}</div>
            </div>
            <div>
              <div className="hero-metric-label">Average rating</div>
              <div className="hero-metric-value">
                ⭐ {avgRating.toFixed(1)} / 5
              </div>
            </div>
            <div>
              <div className="hero-metric-label">Category filter</div>
              <div className="hero-metric-value">
                {categoryFilter === "All" ? "All categories" : categoryFilter}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews list */}
      {filteredReviews.length === 0 ? (
        <p style={{ marginTop: 16 }}>No reviews yet. Try changing filters.</p>
      ) : (
        <div className="card-grid" style={{ marginTop: 10 }}>
          {filteredReviews.map((review) => (
            <div key={review.id || review._id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  alignItems: "baseline",
                }}
              >
                <h4 className="card-title" style={{ marginBottom: 0 }}>
                  {review.productName}
                </h4>
                <span
                  style={{
                    fontSize: "0.8rem",
                    padding: "3px 8px",
                    borderRadius: 999,
                    border: "1px solid rgba(148,163,184,0.6)",
                  }}
                >
                  {review.category}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {review.title}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: getRatingColor(review.rating),
                  }}
                >
                  ⭐ {review.rating.toFixed(1)} / 5
                </span>
              </div>

              <p className="card-text" style={{ marginBottom: 8 }}>
                {review.body}
              </p>

              {(review.pros || review.cons) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  {review.pros && (
                    <div style={{ fontSize: "0.8rem" }}>
                      <strong style={{ color: "#22c55e" }}>Pros:</strong>{" "}
                      {review.pros}
                    </div>
                  )}
                  {review.cons && (
                    <div style={{ fontSize: "0.8rem" }}>
                      <strong style={{ color: "#f97316" }}>Cons:</strong>{" "}
                      {review.cons}
                    </div>
                  )}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.78rem",
                  color: "#9ca3af",
                  marginTop: 4,
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span>
                  {review.purchaseSource
                    ? `Purchased from ${review.purchaseSource}`
                    : "Purchase source not specified"}
                </span>
                <span>
                  Used for{" "}
                  {review.monthsUsed
                    ? `${review.monthsUsed} month${
                        review.monthsUsed > 1 ? "s" : ""
                      }`
                    : "N/A"}
                </span>
              </div>

              {review.productUrl && (
                <div style={{ marginTop: 8 }}>
                  <a
                    href={review.productUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: "0.8rem", padding: "5px 10px" }}
                  >
                    View product link
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewReviews;
