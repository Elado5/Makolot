const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.post(`/api/Invoices/add` , async (req, res) =>{

    let body = req.body;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`transaction_id`, sql.Int, body.transaction_id)
    .input(`customer_id`, sql.Int, body.customer_id)
    .input(`amount_total`, sql.Float(10), body.amount_total)
    .input(`invoice_date`, sql.DateTime, body.invoice_date)
    .execute(`add_invoice`)

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})

route.put(`/api/Invoices/update/:id`, async (req, res) => {

    let params = req.params;
    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`invoice_id`, sql.Int, params.id);

})