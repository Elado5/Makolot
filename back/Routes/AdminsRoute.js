const express = require("express");
const sql = require("mssql");
const config = require("../Utils/config");

let route = express.Router();

route.get(`/all`, async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().execute(`get_all_admins`);

		let data = await query;

		await db.close();

		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}

});

route.post(`/register`, async (req, res) => {
	try {
		let body = req.body;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`admin_email`, sql.NVarChar(150), body.admin_email)
			.input(`admin_password`, sql.NVarChar(50), body.admin_password)
			.output(`admin_id`, sql.Int)
			.execute(`add_admin`);

		let data = await query;

		await db.close();

		res.send(data.output);
	} catch (error) {
		console.error(error);
		res.send(error);
	}

});

route.post(`/login`, async (req, res) => {
	try {
		let body = req.body;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`admin_email`, sql.NVarChar(150), body.admin_email)
			.input(`admin_password`, sql.NVarChar(50), body.admin_password)
			.execute(`login_admin`);

		let data = await query;

		await db.close();

		if (data.recordset.length == 0) {
			res.send({ message: "admin not found." });
			return;
		}
		res.send(data.recordset[0]);
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

		let query = await db.request().input(`admin_id`, sql.Int, params.id).execute(`delete_admin`);

		let data = await query;
		await db.close();
		res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = route;