const express = require('express');
const sql = require('mssql');
const config = require('../Utils/config')

let route = express.Router();


//route.get('/', (req, res) =>{res.send('user route')})

route.get(`/all` , async (req, res) =>{

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request().query(`select * from Addresses`);

    //get the data from the query result
    let data = await query.recordset;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.get(`/:id`, async (req, res) =>{

    let params = req.params;

    sql.on(`error`, (error) => console.log(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
        .input(`address_id`, sql.Int, params.id)
        .execute(`select_address_by_id`)

    //get the data
    let data = await query.recordset

    await db.close()

    //מפני שהנתונים הם רשומות אפשר לגשת לרשומה הראשונה ולקבל את האובייקט עצמו
    res.send(data[0])

})

route.post(`/add`, async (req, res) => {

    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
        .input(`street`, sql.NVarChar(150), body.street)
        .input(`other_data`, sql.NVarChar(150), body.other_data)
        .input(`zip_code`, sql.Int, body.zip_code)
        .execute(`add_address`)

        let data = await query;

        await db.close();

        res.send(data);

})

route.put(`/delete_logical/:id`, async (req, res) => {

    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`address_id`, sql.Int, params.id)
        .execute(`delete_address`)
    let data = await query
    await db.close()
    res.send(data)
})

route.delete(`/delete_physical/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`address_id`, sql.Int, params.id)
        .execute(`delete_address2`)
    let data = await query
    await db.close()
    res.send(data)
})

route.put(`/update/:id`, async (req, res) => {

let params = req.params;
let body = req.body;

sql.on(`error`, (error) => res.send(error));

let db = await sql.connect(config.db);
let query = await db.request()
    .input(`address_id`, sql.Int, params.id)
    .input(`street`, sql.NVarChar(150), body.street)
    .input(`other_data`, sql.NVarChar(150), body.other_data)
    .input(`zip_code`, sql.Int, body.zip_code)
    .execute(`update_address`)

let data = await query;

await db.close();

res.send(data);

})


module.exports = route;