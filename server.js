const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(cors());
//What's before the require is the url addition
app.use('/api/Addresses', require('./Routes/AddressesRoute'));
app.use('/api/Customers', require('./Routes/CustomerRoute'));
app.use('/api/Categories', require('./Routes/CategoryRoute'));
app.use('/api/Managers', require('./Routes/ManagersRoute'));
app.use('/api/Orders', require('./Routes/OrdersRoute'));
app.use('/api/Products', require('./Routes/ProductsRoute'));
app.use('/api/Shops', require('./Routes/ShopsRoute'));




app.get('/', (req, res) =>{res.send('hello everyone')});

const server = http.createServer(app);

server.listen(port, () => {console.log(`Server running on port ${port} -> //:localhost:${port}`)});