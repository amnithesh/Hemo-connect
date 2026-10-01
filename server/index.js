const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UserModel = require("./model/User");
const StockModel = require("./model/Stock");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error', err));

// --- ADMIN AUTHENTICATION ---
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new UserModel({ 
            name, email, password: hashedPassword,
            phoneNumber: "ADMIN", bloodGroup: "ADMIN", district: "ADMIN", address: "ADMIN"
        });
        await newAdmin.save();
        res.status(201).json({ status: "Success" });
    } catch (error) {
        res.status(400).json({ error: "Email already exists" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && user.password !== "DONOR_NO_LOGIN") {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.json({ status: "Success", name: user.name });
        } else {
            res.status(401).json("Invalid Password");
        }
    } else {
        res.status(403).json("Access Denied: Only Admins can log in.");
    }
});

app.post("/logout", (req, res) => {
    res.json({ status: "Logged Out" });
});

// --- DONOR MANAGEMENT ---
app.post("/add-donor", async (req, res) => {
    try {
        const { name, email, phoneNumber, bloodGroup, district, address } = req.body;
        const newDonor = new UserModel({ 
            name, email, phoneNumber, bloodGroup, district, address,
            password: "DONOR_NO_LOGIN",
            lastDonationDate: null 
        });
        await newDonor.save();
        res.status(201).json({ message: "Donor added" });
    } catch (error) {
        res.status(400).json({ error: "Email already exists" });
    }
});

app.get("/search-donors", async (req, res) => {
    const { bloodGroup } = req.query;
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    let query = { 
        password: "DONOR_NO_LOGIN",
        $or: [
            { lastDonationDate: { $lte: ninetyDaysAgo } },
            { lastDonationDate: null }
        ]
    };
    if (bloodGroup) query.bloodGroup = bloodGroup;

    try {
        const donors = await UserModel.find(query);
        res.json(donors);
    } catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
});

// --- BLOOD STOCK MODULE ---
app.post("/add-stock", async (req, res) => {
    try {
        const { bloodGroup, units, collectionDate } = req.body;
        const expiry = new Date(collectionDate);
        expiry.setDate(expiry.getDate() + 42); 

        const newStock = new StockModel({ 
            bloodGroup, 
            units, 
            collectionDate, 
            expiryDate: expiry,
            status: 'Available' 
        });
        await newStock.save();
        res.status(201).json({ message: "Stock Updated" });
    } catch (err) {
        res.status(400).json({ error: "Error adding stock" });
    }
});

app.get("/inventory", async (req, res) => {
    try {
        const today = new Date();
        await StockModel.updateMany(
            { expiryDate: { $lt: today }, status: 'Available' }, 
            { status: 'Expired' }
        );
        const stock = await StockModel.find().sort({ expiryDate: 1 });
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch inventory" });
    }
});

app.listen(3001, () => console.log("Server running on port 3001"));