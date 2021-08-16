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
app.use("/api/Addresses", require("./Routes/AddressesRoute"));
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

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./images");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	}
});

const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("image"), (req, res) => {
	console.log(req.file);
	res.send("Single file upload success");
});

app.post(`/multiple`, upload.array("images", 3), (req, res) => {
	console.log(req.files);
	res.send("Multiple files upload success");
});

app.get("/", (req, res) => {
	res.send("Default Home Page");
});

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server running on port ${port} -> //:localhost:${port}`);
});
