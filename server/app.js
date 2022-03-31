const express = require("express");
const app = express();
// Routes
const transactionsRoutes = require("./routes/transactions.routes");
const authRoutes = require("./routes/auth.routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
	next();
});

app.use(transactionsRoutes);
app.use(authRoutes);

app.listen(5000);
