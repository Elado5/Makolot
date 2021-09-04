const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

route.get(`/all`, async (req, res) => {
	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = await db.request().execute(`get_all_invoices`);

	let data = await query;

	await db.close();

	res.send(data);
});

route.get(`/:id`, async (req, res) => {
	let params = req.params;

	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = await db.request().input(`invoice_id`, sql.Int, params.id).execute(`get_invoice_by_id`);

	let data = await query;

	await db.close();

	res.send(data);
});

route.post(`/add`, async (req, res) => {
	let body = req.body;

	//on error
	sql.on(`error`, (error) => res.send(error));

	//connect to the db
	let db = await sql.connect(config.db);

	//run the wanted query - this one shall be ?
	let query = await db
		.request()
		.input(`transaction_id`, sql.Int, body.transaction_id)
		.input(`customer_id`, sql.Int, body.customer_id)
		.input(`amount_total`, sql.Float(10), body.amount_total)
		.input(`invoice_date`, sql.DateTime, body.invoice_date)
		.execute(`add_invoice`);

	//get the data from the query result
	let data = await query;

	//close connection to server
	await db.close();

	//send the data to the client via api
	res.send(data);
});

//do we need an option to update invoices??
route.put(`/update/:id`, async (req, res) => {
	let params = req.params;
	let body = req.body;

	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = await db
		.request()
		.input(`invoice_id`, sql.Int, params.id)
		.input(`transaction_id`, sql.Int, body.transaction_id)
		.input(`customer_id`, sql.Int, body.customer_id)
		.input(`amount_total`, sql.Float(10), body.amount_total)
		.input(`invoice_date`, sql.DateTime, body.invoice_date)
		.execute(`update_invoice`);

	let data = await query;

	await db.close();

	res.send(data);
});

route.delete(`/delete/:id`, async (req, res) => {
	let params = req.params;

	sql.on(`error`, (error) => res.send(error));

	let db = await sql.connect(config.db);

	let query = await db.request().input(`invoice_id`, sql.Int, params.id).execute(`delete_invoice`);

	let data = await query;

	await db.close();

	res.send(data);
});

module.exports = route;
