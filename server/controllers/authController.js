import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ VALIDATION: Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "All fields are required: name, email, password" 
      });
    }

    // ✅ VALIDATION: Name validation
    if (name.trim().length < 2) {
      return res.status(400).json({ 
        message: "Name must be at least 2 characters long" 
      });
    }

    // ✅ VALIDATION: Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Please provide a valid email address" 
      });
    }

    // ✅ VALIDATION: Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters long" 
      });
    }
    
    // Optional: Strong password validation (uncomment if you want strict rules)
    /*
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" 
      });
    }
    */

    // ✅ VALIDATION: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email already exists" 
      });
    }

    // ✅ Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    res.status(201).json({ 
      success: true,
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle duplicate email error (if not caught above)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "User with this email already exists" 
      });
    }
    
    // Handle validation errors from Mongoose schema
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: messages.join(', ') 
      });
    }
    
    res.status(500).json({ 
      message: "Registration failed. Please try again later." 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ VALIDATION: Check required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    // ✅ VALIDATION: Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Please provide a valid email address" 
      });
    }

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        message: "Invalid email or password" 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        message: "Invalid email or password" 
      });
    }

    // Check if user is suspended
    if (user.status === "suspended") {
      return res.status(403).json({ 
        message: "Account is suspended. Please contact administrator." 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status || "active"
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed. Please try again later." 
    });
  }
};