// src/pages/About.jsx
import deepthiImg from "../assets/deepthi.jpeg";
import teammateImg from "../assets/harshitha.jpeg";

function About() {
  return (
    <div
      style={{
        padding: 24,
        color: "#e6eef8",
        fontFamily: "Inter, system-ui, sans-serif",
        maxWidth: 900,
      }}
    >
      <h2 style={{ marginBottom: 10 }}>About Us</h2>

      <p style={{ color: "#9aa7bb", lineHeight: 1.6 }}>
        CompareCarts is a student-built product review platform focused on honest,
        experience-based reviews. Instead of short ratings or sponsored content,
        we highlight how products perform after real usage to help users make
        better buying decisions.
      </p>

      <p style={{ color: "#9aa7bb", lineHeight: 1.6, marginTop: 10 }}>
        We are 3rd year B.Tech students from the Department of Computer Science
        and Engineering, Shri Vishnu Engineering College for Women. This project
        reflects our interest in full-stack development and building meaningful,
        user-focused applications.
      </p>

      {/* Team Section */}
      <section style={{ marginTop: 36 }}>
        <h3 style={{ marginBottom: 16 }}>Meet the Team</h3>

        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {/* Member 1 */}
          <div
            style={{
              background: "#071023",
              padding: 18,
              borderRadius: 14,
              width: 260,
              textAlign: "center",
            }}
          >
            <img
              src={deepthiImg}
              alt="Deepthi"
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 12,
                border: "2px solid #7c3aed",
              }}
            />
            <h4 style={{ margin: "6px 0" }}>Sri Deepthi</h4>
            <p style={{ fontSize: 13, color: "#9aa7bb" }}>
              Full Stack Developer
            </p>
          </div>

          {/* Member 2 */}
          <div
            style={{
              background: "#071023",
              padding: 18,
              borderRadius: 14,
              width: 260,
              textAlign: "center",
            }}
          >
            <img
              src={teammateImg}
              alt="Harshitha"
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 12,
                border: "2px solid #0ea5e9",
              }}
            />
            <h4 style={{ margin: "6px 0" }}>Somu Harshitha</h4>
            <p style={{ fontSize: 13, color: "#9aa7bb" }}>
              Frontend Developer
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
