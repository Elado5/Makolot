const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();


route.get(`/all`, async (req, res) => {

   sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request().execute(`get_all_categories`);

    let data = await query;

    await db.close();

    res.send(data);
})

route.get(`/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));
 
     let db = await sql.connect(config.db);
 
     let query = await db.request()
     .input(`category_id`, sql.Int, params.id)
     .execute(`get_category_by_id`);
 
     let data = await query;
 
     await db.close();
 
     res.send(data);
 })

route.post(`/add`,async (req,res) => {

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

route.put(`/update/:id`,async (req,res) => {

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

route.put(`/deactivate/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`category_id`, sql.Int, params.id)
        .execute(`deactivate_category`);

    let data = await query;
    await db.close();
    res.send(data);
})

route.put(`/activate/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`category_id`, sql.Int, params.id)
    .execute(`activate_category`);

    let data = await query;
    await db.close();
    res.send(data);
})

route.delete(`/delete/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`category_id`, sql.Int, params.id)
    .execute(`delete_category`);

    let data = await query;
    await db.close();
    res.send(data);
})

module.exports = route;