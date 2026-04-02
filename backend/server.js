const express = require("express");
const cors = require("cors");

const homeRoutes = require("./routes/homeRoutes");
const shopRoutes = require("./routes/shopRoutes");
const singleProductRoutes = require("./routes/singleProductRoutes");
const addCartRoutes = require("./routes/addCartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Static images
app.use("/images", express.static("public/images"));

// Routes


app.use("/api", homeRoutes);
app.use("/api", shopRoutes);
app.use("/api", singleProductRoutes);
app.use("/api", addCartRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});