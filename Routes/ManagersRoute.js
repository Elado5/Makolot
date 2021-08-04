const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.get(`/all`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request().execute(`SELECT * FROM Managers`);

    let data = await query.recordset;

    await db.close();

    res.send(data);
})

route.post(`/register`, async (req, res) => {

    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`retailer_first_name`, sql.NVarChar(150), body.retailer_first_name)
    .input(`retailer_last_name`, sql.NVarChar(150), body.retailer_last_name)
    .input(`retailer_email`, sql.NVarChar(150), body.retailer_email)
    .input(`retailer_phone_number`, sql.VarChar(150), body.retailer_phone_number)
    .input(`birthdate`, sql.DateTime, body.birthdate)
    .input(`retailer_password`, sql.NVarChar(50), body.retailer_password)
    .input(`retailer_city`, sql.NVarChar(50), body.retailer_city)
    .input(`retailer_address_id`, sql.Int, body.retailer_address_id)
    .execute(`add_retail_manager`);

    let data = await query;

    await db.close();

    res.send(data);

})

route.post(`/login` , async (req, res) =>{

    let body = req.body;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`retailer_email`, sql.NVarChar(150), body.retailer_email)
    .input(`retailer_password`, sql.NVarChar(50), body.retailer_password)
    .execute(`Select * from Retail_Managers where retailer_email = @retailer_email and retail_password = @customer_password`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.put(`/update/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`retailer_id`, sql.Int, params.customer_id)
    .input(`retailer_phone_number`, sql.VarChar(10), body.customer_phone_number)
    .input(`retailer_password`, sql.NVarChar(50), body.customer_password)
    .input(`retailer_city`, sql.NVarChar(50), body.customer_city)
    .input(`retailer_address_id`, sql.Int, body.address_id)
    .execute(`update_retailer`);

    let data = await query;
    await db.close();
    res.send(data);
})

route.put(`/delete/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`retailer_id`, sql.Int, params.id)
    .execute(`delete_retail_manager`);

    let data = await query;
    await db.close();
    res.send(data);
})