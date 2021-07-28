const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.post(`/api/Category/add`,async (req,res) => {

    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
        .input(`category_name`, sql.NVarChar(150), body.category_name)
        .input(`category_info`, sql.NVarChar(150), body.category_info)
        .input(`category_image`, sql.Image, body.category_image)
        .execute(`add_category`);

    let data = await query;
    await db.close();
    res.send(data);

})

route.put(`/api/Category/update/:id`,async (req,res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
        .input(`category_id`, sql.Int, params.id)
        .input(`category_name`, sql.NVarChar(150), body.category_name)
        .input(`category_info`, sql.NVarChar(150), body.category_info)
        .input(`category_image`, sql.Image, body.category_image)
        .execute(`add_category`);

    let data = await query;
    await db.close();
    res.send(data);

})

module.exports = route;

route.put(`/api/Category/logical_delete/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`category_id`, sql.Int, params.id)
        .input(`category_name`, sql.NVarChar(150), body.category_name)
        .input(`category_info`, sql.NVarChar(150), body.category_info)
        .input(`category_image`, sql.Image, body.category_image)
        .execute(`delete_category`);
})

route.put(`/api/Category/permanent_delete/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`category_id`, sql.Int, params.id)
        .input(`category_name`, sql.NVarChar(150), body.category_name)
        .input(`category_info`, sql.NVarChar(150), body.category_info)
        .input(`category_image`, sql.Image, body.category_image)
        .execute(`delete_category2`);
})

module.exports = route;