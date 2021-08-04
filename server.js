const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', require('./Routes/CustomerRoute'));
app.use(require('./Routes/CategoryRoute'));
app.use('/api/Addresses', require('./Routes/AddressesRoute'));

app.get('/', (req, res) =>{res.send('hello everyone')});

const server = http.createServer(app);

server.listen(port, () => {console.log(`Server running on port ${port} -> localhost:${port}`)});