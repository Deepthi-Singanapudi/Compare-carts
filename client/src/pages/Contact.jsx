import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // for now, we just show success
    setSubmitted(true);
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <div>
      <h2 className="section-title">Contact Us</h2>
      <p className="section-subtitle">
        Have questions or suggestions? We’d love to hear from you.
      </p>

      {!submitted ? (
        <form className="form-card" onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <div className="form-group">
            <label>Your name</label>
            <input
              placeholder="Name 😊"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Your email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Send message
          </button>
        </form>
      ) : (
        <div
          className="card"
          style={{
            marginTop: 20,
            padding: 20,
            textAlign: "center",
            border: "1px solid rgba(34,197,94,0.4)",
            background: "rgba(21,128,61,0.15)",
          }}
        >
          <h3 style={{ color: "#22c55e" }}>Message Sent Successfully! 🎉</h3>
          <p style={{ marginTop: 10 }}>
            Thank you for reaching out.  
            We will get back to you soon!
          </p>
        </div>
      )}

      {/* Contact info section */}
      <div className="card" style={{ marginTop: 30 }}>
        <h4 className="card-title">Contact Information</h4>
        <p className="card-text" style={{ lineHeight: "1.6" }}>
          <b>Email:</b> deepthisri2005@gmail.com
          <br />
          <b>Github:</b> https://github.com/comparecarts
          <br />
          <b>Location:</b> Bhimavaram, India  
        </p>
      </div>
    </div>
  );
}

export default Contact;
