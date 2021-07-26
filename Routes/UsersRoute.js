const express = require('express');
const sql = require('mssql');
const config = require('../Utils/config')

let route = express.Router();


//route.get('/', (req, res) =>{res.send('user route')})

route.get(`/` , async (req, res) =>{

    //on error
    sql.on(`error`, (error) => res.send(error))

    //connect to the db
    let db = await sql.connect(config.db)

    //run the wanted query - this one shall be ?
    let quert = await db.request().execute(`select_user`)

    
})

module.exports = route