const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.post(`/api/Shops/add`, async (req, res) => {

    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`grocery_shop_name`, sql.NVarChar(150), body.grocery_shop_name)
    .input(`retailer_id`, sql.Int, body.retailer_id)
    .input(`grocery_shop_city`, sql.NVarChar(150), body.grocery_shop_city)
    .input(`address_id`, sql.Int, body.address_id)
    .input(`grocery_shop_opening_times`, sql.NVarChar(150), body.grocery_shop_opening_times)
    .input(`grocery_shop_radius`, sql.Float(10), body.grocery_shop_radius)
    .input(`grocery_phone_number`, sql.VarChar(10))
    .input(`grocery_shop_contact_name`, sql.NVarChar(150), body.grocery_shop_contact_name)
    .execute(`add_grocery_shop`)

    let data = await query;

    await db.close();

    res.send(data);
})

route.put(`/api/Shops/update/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`grocery_shop_id`, sql.Int, params.id)
    .input(`grocery_shop_name`, sql.NVarChar(150), body.grocery_shop_name)
    .input(`retailer_id`, sql.Int, body.retailer_id)
    .input(`grocery_shop_city`, sql.NVarChar(150), body.grocery_shop_city)
    .input(`address_id`, sql.Int, body.address_id)
    .input(`grocery_shop_opening_times`, sql.NVarChar(150), body.grocery_shop_opening_times)
    .input(`grocery_shop_radius`, sql.Float(10), body.grocery_shop_radius)
    .input(`grocery_phone_number`, sql.VarChar(10))
    .input(`grocery_shop_contact_name`, sql.NVarChar(150), body.grocery_shop_contact_name)
    .execute(`update_grocery_shop`)

    let data = await query;

    await db.close();

    res.send(data);
})

route.put(`/api/Shops/delete_logical/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`grocery_shop_id`, sql.Int, params.id)
    .execute(`logical_delete_grocery_shop`)

    let data = await query;

    await db.close();

    res.send(data);
})

route.put(`/api/Shops/delete_logical/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`grocery_shop_id`, sql.Int, params.id)
    .execute(`reactivate_grocery_shop`)

    let data = await query;

    await db.close();

    res.send(data);
})

route.put(`/api/Shops/delete_permanent/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`grocery_shop_id`, sql.Int, params.id)
    .execute(`delete_grocery_shop`)

    let data = await query;

    await db.close();

    res.send(data);
})
