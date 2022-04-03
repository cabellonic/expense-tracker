const express = require("express");
const cors = require("cors");
// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");
const transactionsRoutes = require("./routes/transactions.routes");
const categoryRoutes = require("./routes/category.routes");
const categoriesRoutes = require("./routes/categories.routes");

const app = express();

// Middlewares
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(userRoutes);
app.use(transactionRoutes);
app.use(transactionsRoutes);
app.use(categoryRoutes);
app.use(categoriesRoutes);

app.use((req, res, next) => {
	res.status(404).json({ message: "Not found" });
});

app.listen(process.env.PORT || 5000);
