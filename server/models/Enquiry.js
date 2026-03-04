import mongoose from "mongoose"

const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  type: {
    type: String,
    default: "contact",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Enquiry", enquirySchema)/* S */