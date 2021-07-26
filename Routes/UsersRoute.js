const express = require('express');
const sql = require('mssql');
const config = require('../Utils/config')

let route = express.Router();


//route.get('/', (req, res) =>{res.send('user route')})

route.get(`/` , async (req, res) =>{

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request().execute(`select_user`);

    //get the data from the query result
    let data = await query.recordset;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

module.exports = route