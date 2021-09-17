const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.get(`/all`, async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_all_grocery_shops`);

		let data = await query.recordset;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

route.get(`/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`grocery_shop_id`, sql.Int, params.id).execute(`get_grocery_shop_by_id`);

		let data = await query;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

route.post(`/add`, async (req, res) => {
	try {
		let body = req.body;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`grocery_shop_name`, sql.NVarChar(150), body.grocery_shop_name)
			.input(`retailer_id`, sql.Int, body.retailer_id)
			.input(`grocery_shop_city`, sql.NVarChar(150), body.grocery_shop_city)
			.input(`address_id`, sql.Int, body.address_id)
			.input(`grocery_shop_opening_times`, sql.NVarChar(150), body.grocery_shop_opening_times)
			.input(`grocery_shop_radius`, sql.Float(10), body.grocery_shop_radius)
			.input(`grocery_shop_phone_number`, sql.VarChar(10))
			.input(`grocery_shop_contact_name`, sql.NVarChar(150), body.grocery_shop_contact_name)
			.execute(`add_grocery_shop`);

		let data = await query;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

route.put(`/update/:id`, async (req, res) => {
	try {
		let body = req.body;
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`grocery_shop_id`, sql.Int, params.id)
			.input(`grocery_shop_name`, sql.NVarChar(150), body.grocery_shop_name)
			.input(`retailer_id`, sql.Int, body.retailer_id)
			.input(`grocery_shop_city`, sql.NVarChar(150), body.grocery_shop_city)
			.input(`address_id`, sql.Int, body.address_id)
			.input(`grocery_shop_opening_times`, sql.NVarChar(150), body.grocery_shop_opening_times)
			.input(`grocery_shop_radius`, sql.Float(10), body.grocery_shop_radius)
			.input(`grocery_shop_phone_number`, sql.VarChar(10), body.grocery_shop_phone_number)
			.input(`grocery_shop_contact_name`, sql.NVarChar(150), body.grocery_shop_contact_name)
			.execute(`update_grocery_shop`);

		let data = await query;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

route.put(`/deactivate/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`grocery_shop_id`, sql.Int, params.id).execute(`deactivate_grocery_shop`);

		let data = await query;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

route.put(`/activate/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`grocery_shop_id`, sql.Int, params.id).execute(`activate_grocery_shop`);

		let data = await query;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

route.delete(`/delete/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`grocery_shop_id`, sql.Int, params.id).execute(`delete_grocery_shop`);

		let data = await query;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

module.exports = route;
