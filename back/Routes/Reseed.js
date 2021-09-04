const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

const route = express.Router();

//* When you need to reseed (change current identity) of a table
route.put("/table/:id", async (req, res) => {

	let params = req.params;
	let body = req.body;

	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = db.request()
    .input( `new_id`, sql.Int, params.id)
    .input( `table_name`, sql.NVarChar(50), body.table_name)
    .execute(`reset_identity`);

	let data = await query;

	await db.close();

	res.send(data);
})

module.exports = route;