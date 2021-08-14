const express = require('express');
const sql = require('mssql');
const config = require('../Utils/config');
const multer = require('multer');

let route = express.Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images' )
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine});

route.post('/singleUp', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send("Single file upload success");
});

route.post(`/multipleUp`, upload.array('images', 3), (req, res) => {
    console.log(req.files);
    res.send("Multiple files upload success");
})

route.get(`/all`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request().execute(`get_all_products`);

    let data = await query.recordset;

    await db.close();

    res.send(data);
})

route.get(`/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`get_product_by_id`);

    let data = await query;

    await db.close();

    res.send(data);
})

route.get(`/byCategory/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`category_id`, sql.Int, params.id)
    .execute(`get_product_by_category`);

    let data = await query;

    await db.close();

    res.send(data);
})

route.get(`/bySubCategory/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`sub_category_id`, sql.Int, params.id)
    .execute(`get_product_by_sub_category`);

    let data = await query;

    await db.close();

    res.send(data);
})

route.get(`/preview/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`get_product_image_and_price`);

    let data = await query;

    await db.close();

    res.send(data);
})

route.get(`/preview2/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`get_product_image_price_and_description`);

    let data = await query;

    await db.close();

    res.send(data);
})

route.get(`/discount/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`get_product_discount`);

    let data = await query;

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
    .input(`product_final_price`, sql.Float(10), body.product_final_price)
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
    .input(`product_final_price`, sql.Float(10), body.product_final_price)
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

route.put(`/activate/:id` , async (req, res) =>{

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

route.put(`/deactivate/:id` , async (req, res) =>{

    let params = req.params;

    //on error
    sql.on(`error`, (error) => res.send(error));

    //connect to the db
    let db = await sql.connect(config.db);

    //run the wanted query - this one shall be ?
    let query = await db.request()
    .input(`product_id`, sql.Int, params.id)
    .execute(`deactivate_product`);

    //get the data from the query result
    let data = await query;

    //close connection to server
    await db.close();

    //send the data to the client via api
    res.send(data);
    
})


route.delete(`/delete/:id` , async (req, res) =>{

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