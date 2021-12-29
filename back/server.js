const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const multer = require("multer");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
//What's before the require is the url addition
app.use("/api/Reseed", require("./Routes/Reseed"));
app.use("/api/Addresses", require("./Routes/AddressesRoute"));
app.use("/api/Admins", require("./Routes/AdminsRoute"));
app.use("/api/Customers", require("./Routes/CustomerRoute"));
app.use("/api/CAC", require("./Routes/CACRoute"));
app.use("/api/CreditCards", require("./Routes/CreditCardsRoute"));
app.use("/api/Categories", require("./Routes/CategoryRoute"));
app.use("/api/SubCategories", require("./Routes/SubCategoryRoute"));
app.use("/api/Managers", require("./Routes/ManagersRoute"));
app.use("/api/Orders", require("./Routes/OrdersRoute"));
app.use("/api/Products", require("./Routes/ProductsRoute"));
app.use("/api/Shops", require("./Routes/ShopsRoute"));
app.use("/api/Transactions", require("./Routes/TransactionsRoute"));
app.use("/api/Invoices", require("./Routes/InvoicesRoute"));

app.get("/", (req, res) => {
	res.send("Default Home Page");
});

app.setMaxListeners(1000);

const server = http.createServer(app);
server.on('warning', e => console.warn(e.stack));
server.setMaxListeners(1000);
server.listen(port, () => {
	console.log(`Server running on port ${port} -> http://localhost:${port}`);
});
