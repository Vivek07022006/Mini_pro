const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const cors = require("cors"); // Import cors

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
