const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.get('/all', async (req, res) =>{
    

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request().execute(`get_all_transactions`)
    
    let data = await query;

    await db.close();

    res.send(data);

})

//need to make that query in the sql file
route.get('/:id', async (req, res) =>{
    
    let params = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`transaction_id`, sql.Int, params.id)
    .execute(`get_transaction_by_id`)
    
    let data = await query;

    await db.close();

    res.send(data);

})

route.post(`/add`, async (req, res) => {

    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`customer_id`, sql.Int, body.customer_id)
    .input(`amount_total`, sql.Float(10), body.amount_total)
    .input(`payment_date`, sql.DateTime, body.payment_date)
    .input(`order_id`, sql.Int, body.order_id)
    .input(`payment_status`, sql.NVarChar(20), body.payment_status)
    .input(`credit_card_id`, sql.Int, body.credit_card_id)
    .execute(`add_transaction`)

    let data = await query;

    await db.close();

    res.send(data);
})

route.put(`/update/:id`, async (req, res) =>{

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`transaction_id`, sql.Int, params.id)
    .input(`amount_total`, sql.Float(10), body.amount_total)
    .input(`payment_date`, sql.DateTime, body.payment_date)
    .input(`order_id`, sql.Int, body.order_id)
    .input(`payment_status`, sql.NVarChar(20), body.payment_status)
    .input(`credit_card_id`, sql.Int, body.credit_card_id)
    .execute(`update_transaction`)
    
    let data = await query;

    await db.close();
    
    res.send(data);

})

route.delete(`/delete/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`transaction_id`, sql.Int, params.id)
    .execute(`delete_transaction`);

    let data = await query;

    await db.close();

    res.send(data);
})

module.exports = route;