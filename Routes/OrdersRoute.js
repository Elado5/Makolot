const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.post(`/api/Orders/add` , async (req, res) => {

    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`order_status`, sql.NVarChar(20), body.order_status)
    .input(`order_discount`, sql.Float(10), body.order_discount)
    .input(`order_total_price`, sql.Float(10), body.order_total_price)
    .input(`order_details`, sql.NVarChar(150), body.order_details)
    .input(`order_date`, sql.DateTime, body.order_date)
    .input(`customer_id`, sql.Int, body.customer_id)
    .input(`order_ship_date_preference`, sql.Int, body.order_ship_date_preference)
    .input(`grocery_shop_id`, sql.Int, body.grocery_shop_id)
    .execute(`add_order`)

    let data = await query;

    await db.close();

    res.send(data);

})

route.post(`/api/Orders/delete/:id` , async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(order_id, sql.Int, params.id)
    .execute(`delete_order`)

    let data = await query;

    await db.close();

    res.send(data);

})