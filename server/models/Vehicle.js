import mongoose from "mongoose"

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    year: {
      type: Number,
    },

    hp: {
      type: Number,
    },

    fuel: {
      type: String,
      enum: ["Gasoline", "Diesel", "Hybrid", "Electric"],
      default: "Gasoline",
    },

    image: {
      type: String,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    // ⭐ NEW FIELD (for sold vehicles)
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Car", carSchema)
