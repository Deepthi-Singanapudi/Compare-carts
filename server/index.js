require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------ MIDDLEWARE ------------------
app.use(cors());
app.use(express.json());

// ------------------ DB CONNECT ------------------
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "comparecarts",
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ------------------ MODELS ------------------

// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    credits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Review schema
const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: { type: String },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    pros: { type: String },
    cons: { type: String },
    purchaseSource: { type: String },
    monthsUsed: { type: Number },
    productUrl: { type: String },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

// ------------------ AUTH HELPERS ------------------

function signToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ------------------ ROUTES ------------------

// Health check
app.get("/", (req, res) => {
  res.send("CompareCarts backend is running 🚀");
});

// ----- AUTH -----

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
    });

    const token = signToken(user);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed"+err.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed"+err.message });
  }
});

// Get current user profile
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      credits: user.credits,
    });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

// ----- REVIEWS -----

// Get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    res.json(reviews);
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Post a review
app.post("/api/reviews", authMiddleware, async (req, res) => {
  try {
    const {
      productName,
      category,
      rating,
      title,
      body,
      pros,
      cons,
      purchaseSource,
      monthsUsed,
      productUrl,
    } = req.body;

    if (!productName || !category || !rating || !title || !body) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const review = await Review.create({
      userId: req.user.userId,
      userName: req.user.name,
      productName,
      category,
      rating,
      title,
      body,
      pros,
      cons,
      purchaseSource,
      monthsUsed,
      productUrl,
    });

    // 🎯 Give credits to user: +10 per review
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $inc: { credits: 10 } },
      { new: true }
    );

    res.status(201).json({
      review,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        credits: updatedUser.credits,
      },
    });
  } catch (err) {
    console.error("Post review error:", err);
    res.status(500).json({ error: "Failed to post review" });
  }
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
