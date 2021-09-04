const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

const route = express.Router();

route.get("/all", async (req, res) => {
	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = db.request().execute(`get_all_cac`);

	let data = await query;

	await db.close();

	res.send(data);
});

route.get("/:id", async (req, res) => {
	let params = req.params;

	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = db.request().input(`cac_id`, sql.Int, params.id).execute(`get_cac_by_id`);

	let data = await query;

	await db.close();

	res.send(data);
});

route.post("/add", async (req, res) => {
	let body = req.body;

	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = db
		.request()
		.input(`customer_id`, sql.Int, body.id)
		.input(`address_id`, sql.Int, body.address_id)
		.execute(`add_cac`);

	let data = await query;

	await db.close();

	res.send(data);
});

route.delete(`/delete/:id`, async (req, res) => {
	let params = req.params;

	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = db.request().input(`cac_id`, sql.Int, params.id).execute(`delete_cac`);

	let data = await query;

	await db.close();

	res.send(data);
});

module.exports = route;
