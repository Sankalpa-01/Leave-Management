import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, department, joiningDate, role, password } = req.body;

    const existing = await Employee.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const employee = await Employee.create({
      name,
      email,
      department,
      joiningDate,
      role,
      passwordHash: password, // gets hashed via beforeCreate hook
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
// In authController.js
export const login = async (req, res) => {
  console.log("Login request received with body:", req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // --- Add logging to debug ---
    console.log(`Attempting to find user with email: ${email}`);
    const user = await Employee.findOne({ where: { email } });

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(`User found. Comparing password for user ID: ${user.id}`);
    console.log(`Stored hash is: ${user.passwordHash}`); // See what the hash looks like

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      console.log(`Password comparison failed for user ID: ${user.id}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(`Password matched! Creating JWT for user ID: ${user.id}`);
    // --- End of logging ---

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ id: user.id, token, role: user.role, name: user.name });
  } catch (err) {
    console.error("An error occurred during login:", err); // Log the actual error
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    // With JWT we can’t truly “logout” on server unless we blacklist tokens
    // For now, just respond OK
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Logout failed" });
  }
};
