const express = require("express");
const sql = require("mssql");
const config = require("../Utils/config");

let route = express.Router();

route.get(`/all`, async (req, res) => {
	try {
		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db.request().query(`SELECT * FROM Customers`);

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

		let query = await db.request().input(`customer_id`, sql.Int, params.id).execute(`get_customer_by_id`);

		let data = await query;

		await db.close();

		if (data.recordset.length == 0) {
			res.send({ message: "customer not found." });
			return;
		}
		res.send(data.recordset[0]);
	} catch (error) {
		console.error(error);
	}

});

route.post(`/register`, async (req, res) => {
	try {
		let body = req.body;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`customer_first_name`, sql.NVarChar(150), body.customer_first_name)
			.input(`customer_last_name`, sql.NVarChar(150), body.customer_last_name)
			.input(`customer_email`, sql.NVarChar(150), body.customer_email)
			.input(`customer_phone_number`, sql.VarChar(10), body.customer_phone_number)
			.input(`customer_birthdate`, sql.DateTime, body.customer_birthdate)
			.input(`customer_password`, sql.NVarChar(50), body.customer_password)
			.input(`customer_city`, sql.NVarChar(50), body.customer_city)
			.input(`address_id`, sql.Int, body.address_id)
			.input(`credit_card_id`, sql.Int, body.credit_card_id)
			//what about credit card date & cvv?
			.execute(`add_customer`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
		res.send(data);
	} catch (error) {
		console.error(error);
	}

});

route.post(`/login`, async (req, res) => {
	try {
		let body = req.body;

		//on error
		sql.on(`error`, (error) => res.send(error));

		//connect to the db
		let db = await sql.connect(config.db);

		//run the wanted query - this one shall be ?
		let query = await db
			.request()
			.input(`customer_email`, sql.NVarChar(150), body.customer_email)
			.input(`customer_password`, sql.NVarChar(50), body.customer_password)
			.execute(`login_customer`);

		//get the data from the query result
		let data = await query;

		//close connection to server
		await db.close();

		//send the data to the client via api
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
			.input(`customer_id`, sql.Int, params.id)
			.input(`customer_phone_number`, sql.VarChar(10), body.customer_phone_number)
			.input(`customer_password`, sql.NVarChar(50), body.customer_password)
			.input(`customer_city`, sql.NVarChar(50), body.customer_city)
			.input(`address_id`, sql.Int, body.address_id)
			.execute(`update_customer`);

		let data = await query;
		await db.close();
		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

route.put(`/update_card/:id`, async (req, res) => {
	try {
		let body = req.body;
		let params = req.params;

		sql.on(`error`, (error) => res.send(error));

		let db = await sql.connect(config.db);

		let query = await db
			.request()
			.input(`customer_id`, sql.Int, params.id)
			.input(`credit_card_id`, sql.VarChar(10), body.credit_card_id)
			.execute(`update_credit_card`);

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

		let query = await db.request().input(`customer_id`, sql.Int, params.id).execute(`delete_customer`);

		let data = await query;
		await db.close();
		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

module.exports = route;

//כרטיס האשראי טבלה נפרדת - מסובך
