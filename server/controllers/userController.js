// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import { sendEmail } from "../utils/sendEmail.js";


// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };


// export const createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user",
//     });

//     res.status(201).json(user);
//   } catch {
//     res.status(500).json({ message: "User creation failed" });
//   }
// };


// export const inviteUser = async (req, res) => {
//   const { name, email } = req.body;

//   try {
//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const inviteToken = crypto.randomBytes(32).toString("hex");

//     await User.create({
//       name,
//       email,
//       password: null,
//       role: "user",
//       isInvited: true,
//       inviteToken,
//       inviteExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     // ✅ FIXED: use frontend URL from env
//     const inviteLink = `${process.env.FRONTEND_URL}/set-password?token=${inviteToken}`;

//     await sendEmail({
//       to: email,
//       subject: "You're invited to Todo App",
//       html: `
//         <h2>Hello ${name},</h2>
//         <p>You have been invited to Todo App.</p>
//         <p>Click below to set your password:</p>
//         <a href="${inviteLink}"
//            style="display:inline-block;padding:10px 16px;
//            background:#2563eb;color:#fff;border-radius:6px;
//            text-decoration:none;">
//            Set Password
//         </a>
//         <p>This link will expire in 24 hours.</p>
//       `,
//     });

//     res.status(201).json({
//       message: "Invite email sent successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to invite user" });
//   }
// };

// /* ================================
//    ✅ SET PASSWORD (USER)
// ================================ */
// export const setPassword = async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     const user = await User.findOne({
//       inviteToken: token,
//       inviteExpiry: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired invite" });
//     }

//     user.password = await bcrypt.hash(password, 10);
//     user.inviteToken = null;
//     user.inviteExpiry = null;
//     user.isInvited = false;

//     await user.save();

//     res.json({ message: "Password set successfully" });
//   } catch {
//     res.status(500).json({ message: "Failed to set password" });
//   }
// };

// /* ================================
//    ✅ SUSPEND / ACTIVATE USER
// ================================ */
// export const updateUserStatus = async (req, res) => {
//   const { status } = req.body;

//   if (!["active", "suspended"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status value" });
//   }

//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.status = status;
//     await user.save();

//     res.json({
//       message: `User ${status} successfully`,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//       },
//     });
//   } catch {
//     res.status(500).json({ message: "Failed to update user status" });
//   }
// };


// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import { sendEmail } from "../utils/sendEmail.js";

// /* ================================
//    GET ALL USERS (ADMIN)
// ================================ */
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

// /* ================================
//    CREATE USER (ADMIN)
// ================================ */
// export const createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user",
//     });

//     res.status(201).json(user);
//   } catch {
//     res.status(500).json({ message: "User creation failed" });
//   }
// };

// /* ================================
//    INVITE USER (ADMIN)
// ================================ */
// export const inviteUser = async (req, res) => {
//   const { name, email } = req.body;

//   try {
//     // ✅ Basic validation
//     if (!name || !email) {
//       return res.status(400).json({ message: "Name and email are required" });
//     }

//     // ✅ Email format validation
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const inviteToken = crypto.randomBytes(32).toString("hex");

//     await User.create({
//       name,
//       email,
//       password: null,
//       role: "user",
//       isInvited: true,
//       inviteToken,
//       inviteExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     const inviteLink = `${process.env.FRONTEND_URL}/set-password?token=${inviteToken}`;

//     await sendEmail({
//       to: email,
//       subject: "You're invited to Todo App",
//       html: `
//         <h2>Hello ${name},</h2>
//         <p>You have been invited to Todo App.</p>
//         <p>Click below to set your password:</p>
//         <a href="${inviteLink}"
//            style="display:inline-block;padding:10px 16px;
//            background:#2563eb;color:#fff;border-radius:6px;
//            text-decoration:none;">
//            Set Password
//         </a>
//         <p>This link will expire in 24 hours.</p>
//       `,
//     });

//     res.status(201).json({
//       message: "Invite email sent successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to invite user" });
//   }
// };

// /* ================================
//    SET PASSWORD (INVITED USER)
// ================================ */
// export const setPassword = async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     if (!token || !password) {
//       return res.status(400).json({ message: "Token and password are required" });
//     }

//     const user = await User.findOne({
//       inviteToken: token,
//       inviteExpiry: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired invite" });
//     }

//     user.password = await bcrypt.hash(password, 10);
//     user.inviteToken = null;
//     user.inviteExpiry = null;
//     user.isInvited = false;

//     await user.save();

//     res.json({ message: "Password set successfully" });
//   } catch {
//     res.status(500).json({ message: "Failed to set password" });
//   }
// };

// /* ================================
//    SUSPEND / ACTIVATE USER
// ================================ */
// export const updateUserStatus = async (req, res) => {
//   const { status } = req.body;

//   if (!["active", "suspended"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status value" });
//   }

//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.status = status;
//     await user.save();

//     res.json({
//       message: `User ${status} successfully`,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//       },
//     });
//   } catch {
//     res.status(500).json({ message: "Failed to update user status" });
//   }
// };
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

/* ================================
   GET ALL USERS (ADMIN)
================================ */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* ================================
   CREATE USER (ADMIN) - UPDATED WITH VALIDATION
================================ */
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // ✅ Name validation
    if (name.trim().length < 2) {
      return res.status(400).json({ 
        success: false,
        message: "Name must be at least 2 characters long" 
      });
    }

    // ✅ Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }

    // ✅ Password validation
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 8 characters long" 
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error("Create user error:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: "User with this email already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "User creation failed" 
    });
  }
};

/* ================================
   INVITE USER (ADMIN)
================================ */
export const inviteUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    // ✅ Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // ✅ Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");

    await User.create({
      name,
      email,
      password: null,
      role: "user",
      isInvited: true,
      inviteToken,
      inviteExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    const inviteLink = `${process.env.FRONTEND_URL}/set-password?token=${inviteToken}`;

    await sendEmail({
      to: email,
      subject: "You're invited to Todo App",
      html: `
        <h2>Hello ${name},</h2>
        <p>You have been invited to Todo App.</p>
        <p>Click below to set your password:</p>
        <a href="${inviteLink}"
           style="display:inline-block;padding:10px 16px;
           background:#2563eb;color:#fff;border-radius:6px;
           text-decoration:none;">
           Set Password
        </a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.status(201).json({
      message: "Invite email sent successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to invite user" });
  }
};

/* ================================
   SET PASSWORD (INVITED USER) - UPDATED WITH VALIDATION
================================ */
export const setPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (!token || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Token and password are required" 
      });
    }

    // ✅ Password strength validation for invited users
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 8 characters long" 
      });
    }

    const user = await User.findOne({
      inviteToken: token,
      inviteExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid or expired invite" 
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.inviteToken = null;
    user.inviteExpiry = null;
    user.isInvited = false;

    await user.save();

    res.json({ 
      success: true,
      message: "Password set successfully" 
    });
  } catch (error) {
    console.error("Set password error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to set password" 
    });
  }
};

/* ================================
   SUSPEND / ACTIVATE USER
================================ */
export const updateUserStatus = async (req, res) => {
  const { status } = req.body;

  if (!["active", "suspended"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = status;
    await user.save();

    res.json({
      message: `User ${status} successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch {
    res.status(500).json({ message: "Failed to update user status" });
  }
};