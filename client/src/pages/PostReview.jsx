import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostReview({ apiUrl, token, onReviewSaved }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Mobiles");
  const [rating, setRating] = useState(4);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [purchaseSource, setPurchaseSource] = useState("");
  const [monthsUsed, setMonthsUsed] = useState(1);
  const [productUrl, setProductUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!productName.trim() || !title.trim() || !body.trim()) {
      setError("Please fill product name, short title and detailed review.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productName,
          category,
          rating: Number(rating),
          title,
          body,
          pros,
          cons,
          purchaseSource,
          monthsUsed: Number(monthsUsed),
          productUrl: productUrl.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to post review");
      } else {
        // refresh list in parent
        onReviewSaved && onReviewSaved();
        navigate("/reviews");
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
      <h2 className="section-title">Post a Review</h2>
      <p className="section-subtitle">
        Share your real experience and help others make smarter choices.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product name</label>
          <input
            placeholder="Example: Redmi Note 13 Pro, Sony WH-CH720N..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Mobiles</option>
            <option>Laptops</option>
            <option>Earphones</option>
            <option>Headphones</option>
            <option>Accessories</option>
            <option>Home Appliances</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Rating (out of 5)</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Short title</label>
          <input
            placeholder="Example: Great battery, camera average"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Detailed review</label>
          <textarea
            rows="4"
            placeholder="Explain how the product performed after real usage. What surprised you? What disappointed you?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Pros (comma separated)</label>
          <input
            placeholder="Battery, display, performance..."
            value={pros}
            onChange={(e) => setPros(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Cons (comma separated)</label>
          <input
            placeholder="Low light camera, heating..."
            value={cons}
            onChange={(e) => setCons(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Purchased from</label>
          <input
            placeholder="Amazon, Flipkart, Croma..."
            value={purchaseSource}
            onChange={(e) => setPurchaseSource(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>How many months have you used this?</label>
          <input
            type="number"
            min="0"
            value={monthsUsed}
            onChange={(e) => setMonthsUsed(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product link (optional)</label>
          <input
            type="url"
            placeholder="Paste Amazon/Flipkart/product page link"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
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
          {loading ? "Posting..." : "Submit review"}
        </button>
      </form>
    </div>
  );
}

export default PostReview;
