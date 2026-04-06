import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

export const adminLogin = async (req, res) => {
  try {
    console.log("🔐 Admin login request received");
    console.log("📥 Request body:", req.body);

    const { email, password } = req.body;

    // Check input
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("🔍 Searching for user with email:", email);

    const user = await User.findOne({ email });

    console.log("👤 User found:", user);

    if (!user) {
      console.log("❌ No user found with this email");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🔑 Comparing passwords...");
    console.log("➡️ Entered password:", password);
    console.log("➡️ Hashed password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("✅ Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🔐 Checking user role:", user.role);

    if (user.role !== "admin") {
      console.log("⛔ User is not an admin");
      return res
        .status(403)
        .json({ message: "You are not authorized as admin" });
    }

    console.log("🎟️ Generating JWT token...");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    console.log("✅ Token generated:", token);

    // Remove password before sending response
    const { password: pwd, ...safeUser } = user._doc;

    console.log("📤 Sending response to client");

    res.json({ user: safeUser, token });
  } catch (error) {
    console.error("🔥 Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
