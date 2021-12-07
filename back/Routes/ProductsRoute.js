const express = require("express");
const sql = require("mssql");
const config = require("../Utils/config");
const multer = require("multer");

let route = express.Router();

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../front/public/product-img");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	}
});

const upload = multer({ storage: fileStorageEngine });

route.post("/singleUp", upload.single("image"), (req, res) => {
	console.log('req', req.file.filename);
	res.send({path: `/product-img/${req.file.filename}`});
});

route.post(`/multipleUp`, upload.array("images", 3), (req, res) => {
	console.log(req.files);
	res.send(req.files + " upload success");
});

route.get(`/all`, async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_all_products`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/all_discounted`, async (req, res) => {

	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_all_discounted_products`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
})

route.get(`/by_name/:name`, async (req, res) => {

	try {

		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`product_name`,sql.NVarChar(150), params.name).execute(`get_products_by_name`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
})

route.get(`/by_id/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`product_id`, sql.Int, params.id).execute(`get_product_by_id`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
		return;
	}
});

route.get(`/byCategory/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`category_id`, sql.Int, params.id).execute(`get_products_by_category`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/bySubCategory/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`sub_category_id`, sql.Int, params.id).execute(`get_products_by_sub_category`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/preview/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`product_id`, sql.Int, params.id).execute(`get_product_image_and_price`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/preview2/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`product_id`, sql.Int, params.id)
			.execute(`get_product_image_price_and_description`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/discount/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`product_id`, sql.Int, params.id).execute(`get_product_discount`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/allactive`, async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_active_products`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/allinactive`, async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_inactive_products`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.post(`/add`, async (req, res) => {
	try {
		let body = req.body;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`category_id`, sql.Int, body.category_id)
			.input(`sub_category_id`, sql.Int, body.sub_category_id)
			.input(`product_name`, sql.NVarChar(150), body.product_name)
			.input(`product_price`, sql.Float(10), body.product_price)
			.input(`product_final_price`, sql.Float(10), body.product_final_price)
			.input(`product_details`, sql.NVarChar(150), body.product_details)
			.input(`product_description`, sql.NVarChar(150), body.product_description)
			.input(`product_image`, sql.Text, body.product_image)
			.input(`product_suppliers`, sql.NVarChar(150), body.product_suppliers)
			.execute(`add_product`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
	}
});

route.put(`/update/:id`, async (req, res) => {
	try {
		let body = req.body;
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`product_id`, sql.Int, params.id)
			.input(`category_id`, sql.Int, body.category_id)
			.input(`sub_category_id`, sql.Int, body.sub_category_id)
			.input(`product_name`, sql.NVarChar(150), body.product_name)
			.input(`product_price`, sql.Float(10), body.product_price)
			.input(`product_final_price`, sql.Float(10), body.product_final_price)
			.input(`product_details`, sql.NVarChar(150), body.product_details)
			.input(`product_description`, sql.NVarChar(150), body.product_description)
			.input(`product_image`, sql.Text, body.product_image)
			.input(`product_suppliers`, sql.NVarChar(150), body.product_suppliers)
			.output(`product_id_output`, sql.Int)
			.execute(`update_product`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.output);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/update/Image/:id`, async (req, res) => {
	try {
		let body = req.body;
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`product_id`, sql.Int, params.id)
			.input(`product_image`, sql.Text, body.product_image)
			.output(`product_id_output`, sql.Int)
			.execute(`update_product_image`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.output);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/discount/:id`, async (req, res) => {
	try {
		let body = req.body;
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`product_id`, sql.Int, params.id)
			.input(`discount`, sql.Int, body.discount)
			.execute(`discount_product`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/discount/category/:id`, async (req, res) => {
	try {
		let body = req.body;
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`category_id`, sql.Int, params.id)
			.input(`discount`, sql.Int, body.discount)
			.execute(`discount_all_products_in_category`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/discount/subCategory/:id`, async (req, res) => {
	try {
		let body = req.body;
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`sub_category_id`, sql.Int, params.id)
			.input(`discount`, sql.Int, body.discount)
			.execute(`discount_all_products_in_sub_category`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/discount/cancelAll`, async (req, res) => {
	try {
		let body = req.body;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db.request().input(`discount`, sql.Int, body.discount).execute(`cancel_all_discounts`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/discount/cancel/:id`, async (req, res) => {
	try {
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db.request().input(`product_id`, sql.Int, params.id).execute(`cancel_discount_product`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/discount/cancelCategory/:id`, async (req, res) => {
	try {
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db.request().input(`category_id`, sql.Int, params.id).execute(`cancel_all_discounts_in_category`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/discount/cancelSubCategory/:id`, async (req, res) => {
	try {
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`sub_category_id`, sql.Int, params.id)
			.execute(`cancel_all_discounts_in_sub_category`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/activate/:id`, async (req, res) => {
	try {
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db.request().input(`product_id`, sql.Int, params.id).execute(`activate_product`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/deactivate/:id`, async (req, res) => {
	try {
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db.request().input(`product_id`, sql.Int, params.id).execute(`deactivate_product`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.delete(`/delete/:id`, async (req, res) => {
	try {
		let params = req.params;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db.request().input(`product_id`, sql.Int, params.id).execute(`delete_product`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = route;
