const express = require('express');
const sql = require('mssql');
const config = require('../Utils/config')

let route = express.Router();


//route.get('/', (req, res) =>{res.send('user route')})

route.post(`/api/customers/register` , async (req, res) =>{

    let body = req.body;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`customer_first_name`, sql.NVarChar(150), body.customer_first_name)
    .input(`customer_last_name`, sql.NVarChar(150), body.customer_last_name)
    .input(`customer_email`, sql.NVarChar(150), body.customer_email)
    .input(`customer_phone_number`, sql.VarChar(10), body.customer_phone_number)
    .input(`customer_birthdate`, datetime, body.customer_birthdate)
    .input(`customer_password`, sql.NVarChar(50), body.customer_password)
    .input(`customer_city`, sql.NVarChar(50), body.customer_city)
    .input(`address_id`, sql.Int, body.address_id)
    .input(`credit_card_id`, sql.Int, body.credit_card_id)
    //what about credit card date & cvv?
    .execute(`add_customer`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.post(`/api/customers/login` , async (req, res) =>{

    let body = req.body;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`customer_email`, sql.NVarChar(150), body.customer_email)
    .input(`customer_password`, sql.NVarChar(50), body.customer_password)
    .execute(`Select * from Customers where customer_email = @customer_email and customer_password = @customer_password`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.put(`/api/customers/update/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`customer_id`, sql.Int, params.customer_id)
    .input(`customer_phone_number`, sql.VarChar(10), body.customer_phone_number)
    .input(`customer_password`, sql.NVarChar(50), body.customer_password)
    .input(`customer_city`, sql.NVarChar(50), body.customer_city)
    .input(`address_id`, sql.Int, body.address_id)
    .execute(`update_customer`);

    let data = await query
    await db.close()
    res.send(data)
})

route.put(`/api/customers/update_card/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`customer_id`, sql.Int, params.id)
    .input(`credit_card_id`, sql.VarChar(10), body.credit_card_id)
    .execute(`update_credit_card`);

    let data = await query;
    await db.close();
    res.send(data);
})

route.put(`/api/customers/delete/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`customer_id`, sql.Int, params.id)
    .execute(`delete_customer`);

    let data = await query;
    await db.close();
    res.send(data);

})



module.exports = route

//כרטיס האשראי טבלה נפרדת - מסובך