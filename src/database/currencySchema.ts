import mongoose, { Schema } from "mongoose";

/**
 * Schema Data
 * ===========
 * userId: "1234567890123"
 * balance: 9999
 */
const data = new Schema(
  {
    userId: String,
    balance: Number
  }
);

export default mongoose.model("currencyData", data);