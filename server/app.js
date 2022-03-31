const express = require("express");
const app = express();
// Routes
const transactionsRoutes = require("./routes/transactions.routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(transactionsRoutes);
// app.use(indexRoutes);

app.listen(5000);
