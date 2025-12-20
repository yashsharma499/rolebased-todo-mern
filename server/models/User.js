import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function(email) {
          const emailRegex = /^\S+@\S+\.\S+$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address"
      }
    },

    password: {
      type: String,
      required: function() {
        // Password is required only for regular registration (not invited users)
        return !this.isInvited;
      },
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function(password) {
          // Only validate password strength for regular registration
          if (this.isInvited && !password) return true;
          
          // Basic validation - at least 8 chars
          if (password.length < 8) return false;
          
          // Optional: Strong password validation
          // Uncomment if you want strict password rules
          /*
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(password);
          */
          return true;
        },
        message: "Password must be at least 8 characters long"
      }
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

// Create index for email for faster lookups
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);