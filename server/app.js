const express = require("express");
const app = express();
const cors = require("cors");
// Routes
const authRoutes = require("./routes/auth.routes");
const transactionsRoutes = require("./routes/transactions.routes");
const categoriesRoutes = require("./routes/categories.routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(authRoutes);
app.use(transactionsRoutes);
app.use(categoriesRoutes);

app.listen(5000);
