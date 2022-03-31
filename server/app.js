const express = require("express");
const app = express();
const cors = require("cors");
// Routes
const transactionsRoutes = require("./routes/transactions.routes");
const authRoutes = require("./routes/auth.routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(transactionsRoutes);
app.use(authRoutes);

app.listen(5000);
