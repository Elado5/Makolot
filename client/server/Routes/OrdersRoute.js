const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.get(`/all`, async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_all_orders`);

		let data = await query;

		db.removeAllListeners();

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`order_id`, sql.Int, params.id).execute(`get_order_by_id`);

		let data = await query;

		db.removeAllListeners();

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/customer/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`customer_id`, sql.Int, params.id).execute(`get_orders_by_customer_id`);

		let data = await query;

		db.removeAllListeners();

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

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`order_status`, sql.NVarChar(20), body.order_status)
			.input(`order_discount`, sql.Float(10), body.order_discount)
			.input(`order_total_price`, sql.Float(10), body.order_total_price)
			.input(`order_details`, sql.NVarChar(150), body.order_details)
			.input(`order_date`, sql.DateTime, body.order_date)
			.input(`customer_id`, sql.Int, body.customer_id)
			.input(`order_ship_date_preference`, sql.DateTime, body.order_ship_date_preference)
			.input(`grocery_shop_id`, sql.Int, body.grocery_shop_id)
			.output(`order_id`, sql.Int)
			.execute(`add_order`);

		let data = await query;

		db.removeAllListeners();

		await db.close();

		res.send(data.output);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/update/:id`, async (req, res) => {
	try {
		let params = req.params;
		let body = req.body;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`order_id`, sql.Int, params.id)
			.input(`order_status`, sql.NVarChar(20), body.order_status)
			.input(`order_total_price`, sql.Float(10), body.order_total_price)
			.input(`grocery_shop_id`, sql.Int.body.grocery_shop_id)
			.execute(`update_order`);

		let data = await query;

		db.removeAllListeners();

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/update_status/:id`, async (req, res) => {
	try {
		let params = req.params;
		let body = req.body;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.output(`order_id`, sql.Int, params.id)
			.input(`order_status`, sql.NVarChar(20), body.order_status)
			.execute(`update_order_status`);

		let data = await query;

		db.removeAllListeners();

		await db.close();

		res.send(data.output);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.delete(`/delete/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`order_id`, sql.Int, params.id).execute(`delete_order`);

		let data = await query;

		db.removeAllListeners();

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = route;