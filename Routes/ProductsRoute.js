const express = require('express');
const sql = require('mssql');
const config = require('../Utils/config');

let route = express.Router();

route.get(`/all`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request().execute(`SELECT * FROM Addresses`);

    let data = await query.recordset;

    await db.close();

    res.send(data);
})


route.post(`/add` , async (req, res) =>{

    let body = req.body;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`category_id`, sql.Int, body.id)
    .input(`product_name`, sql.NVarChar(150), body.product_name)
    .input(`product_price`, sql.Float(10), body.product_price)
    .input(`product_details`, sql.NVarChar(150), body.product_details)
    .input(`product_description`, sql.NVarChar(150), body.product_description)
    .input(`product_image`, sql.Image, body.product_image)
    .execute(`add_product`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.put(`/update/:id` , async (req, res) =>{

    let body = req.body;
    let params = req.params;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .input(`product_name`, sql.NVarChar(150), body.product_name)
    .input(`product_price`, sql.Float(10), body.product_price)
    .input(`product_details`, sql.NVarChar(150), body.product_details)
    .input(`product_description`, sql.NVarChar(150), body.product_description)
    .input(`product_image`, sql.Image, body.product_image)
    .execute(`update_product`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.put(`/reactivate/:id` , async (req, res) =>{

    let params = req.params;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`activate_product`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.put(`/logical_delete/:id` , async (req, res) =>{

    let params = req.params;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`delete_product`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})


route.put(`/api/products/permanent_delete/:id` , async (req, res) =>{

    let params = req.params;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`delete_product`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

module.exports = route;