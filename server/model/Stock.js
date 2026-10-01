const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    bloodGroup: { type: String, required: true },
    units: { type: Number, required: true },
    collectionDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['Available', 'Used', 'Expired'], default: 'Available' }
});

const StockModel = mongoose.model("stocks", StockSchema);
module.exports = StockModel;