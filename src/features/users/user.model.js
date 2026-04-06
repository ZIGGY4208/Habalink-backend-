import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // resetOTP: {
    //   type: String,
    //   default: null,
    // },

    // otpExpires: {
    //   type: Date,
    //   default: null,
    // },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
