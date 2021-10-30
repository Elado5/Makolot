const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.get("/all", async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_all_sub_categories`);

		let data = await query;

		await db.close();

		res.send(data);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get("/:id", async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`sub_category_id`, sql.Int, params.id).execute(`get_sub_category_by_id`);

		let data = await query;

		await db.close();

		res.send(data);
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
			.input(`category_id`, sql.Int, body.category_id)
			.input(`sub_category_name`, sql.NVarChar(150), body.sub_category_name)
			.input(`sub_category_info`, sql.NVarChar(150), body.sub_category_info)
			.input(`sub_category_image`, sql.Text, body.sub_category_image)
			.execute(`add_sub_category`);

		let data = await query;
		await db.close();
		res.send(data);
	} catch (error) {
		console.error(error);
		res.send(error);
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
			.input(`sub_category_id`, sql.Int, params.id)
			.input(`sub_category_name`, sql.NVarChar(150), body.sub_category_name)
			.input(`sub_category_info`, sql.NVarChar(150), body.sub_category_info)
			.input(`sub_category_image`, sql.Text, body.sub_category_image)
			.execute(`add_sub_category`);

		let data = await query;
		await db.close();
		res.send(data);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/deactivate/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`sub_category_id`, sql.Int, params.id).execute(`deactivate_sub_category`);

		let data = await query;
		await db.close();
		res.send(data);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.put(`/activate/:id`, async (req, res) => {
	try {
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().input(`sub_category_id`, sql.Int, params.id).execute(`activate_sub_category`);

		let data = await query;
		await db.close();
		res.send(data);
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

		let query = await db.request().input(`sub_category_id`, sql.Int, params.id).execute(`delete_sub_category`);

		let data = await query;
		await db.close();
		res.send(data);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = route;