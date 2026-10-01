// model/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    // NEW FIELD: Tracks eligibility
    lastDonationDate: { type: Date, default: null } 
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;