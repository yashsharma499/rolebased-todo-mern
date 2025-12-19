import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      default: null, // ✅ no password until user sets it
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // ✅ ADMIN CONTROL
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },

    // ✅ INVITE FLOW FIELDS (NEW)
    inviteToken: {
      type: String,
    },
    inviteExpiry: {
      type: Date,
    },
    isInvited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
