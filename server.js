const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const multer = require('multer');


const port = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(cors());
//What's before the require is the url addition
app.use('/api/Addresses', require('./Routes/AddressesRoute'));
app.use('/api/Customers', require('./Routes/CustomerRoute'));
app.use('/api/CreditCards', require('./Routes/CreditCardsRoute'));
app.use('/api/Categories', require('./Routes/CategoryRoute'));
app.use('/api/Managers', require('./Routes/ManagersRoute'));
app.use('/api/Orders', require('./Routes/OrdersRoute'));
app.use('/api/Products', require('./Routes/ProductsRoute'));
app.use('/api/Shops', require('./Routes/ShopsRoute'));
app.use('/api/transactions', require('./Routes/TransactionsRoute'));
app.use('/api/Invoices', require('./Routes/InvoicesRoute'));

const upload = multer({
    dest: "./uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post
(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./uploads/vegetables.jpg");

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpeg" || path.extname(req.file.originalname).toLowerCase() === ".jpg") {
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
        });
    }
        else {
        fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);

            res
            .status(403)
            .contentType("text/plain")
            .end("Only .png/jpeg/jpg files are allowed!");
        });
        }
    }
);

app.get('/', (req, res) =>{res.send('Default Home Page')});

const server = http.createServer(app);

server.listen(port, () => {console.log(`Server running on port ${port} -> //:localhost:${port}`)});