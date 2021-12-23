const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();

//route.get('/', (req, res) =>{res.send('user route')})

route.get(`/all`, async (req, res) => {
	try {
		//on error
	sql.on(`error`, (error) => res.send(error));

	//connect to the db
	let db = await sql.connect(config.db);

	//run the wanted query - this one shall be ?
	let query = await db.request().execute(`get_all_addresses`);

	//get the data from the query result
	let data = await query;

	//close connection to server
	await db.close();

	//send the data to the client via api
	res.send(data);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/:id`, async (req, res) => {
	try {
		
	let params = req.params;

	sql.on(`error`, (error) => console.log(error));

	let db = await sql.connect(config.db);

	let query = await db.request().input(`address_id`, sql.Int, params.id).execute(`get_address_by_id`);

	//get the data
	let data = await query;

	await db.close();

	//מפני שהנתונים הם רשומות אפשר לגשת לרשומה הראשונה ולקבל את האובייקט עצמו
	res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

route.get(`/preview/:id`, async (req, res) => {
try {
	let params = req.params;

	sql.on(`error`, (error) => console.log(error));

	let db = await sql.connect(config.db);

	let query = await db.request().input(`address_id`, sql.Int, params.id).execute(`get_address_preview`);

	//get the data
	let data = await query;

	await db.close();

	//מפני שהנתונים הם רשומות אפשר לגשת לרשומה הראשונה ולקבל את האובייקט עצמו
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
		.input(`city`, sql.NVarChar(150), body.city)
		.input(`street`, sql.NVarChar(150), body.street)
		.input(`other_data`, sql.NVarChar(150), body.other_data)
		.input(`zip_code`, sql.Int, body.zip_code)
		.output(`address_id`, sql.Int)
		.execute(`add_address`);

	let data = await query;

	await db.close();

	res.send(data.output);
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
	let query = await db.request().input(`address_id`, sql.Int, params.id).execute(`activate_address`);
	let data = await query;
	await db.close();
	res.send(data.recordset);
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
	let query = await db.request().input(`address_id`, sql.Int, params.id).execute(`deactivate_address`);
	let data = await query;
	await db.close();
	res.send(data.recordset);
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
		let query = await db.request().input(`address_id`, sql.Int, params.id).execute(`delete_address`);
		let data = await query;
		await db.close();
		res.send(data.recordset);
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
		.input(`address_id`, sql.Int, params.id)
		.input(`city`, sql.NVarChar(150), body.city)
		.input(`street`, sql.NVarChar(150), body.street)
		.input(`other_data`, sql.NVarChar(150), body.other_data)
		.input(`zip_code`, sql.Int, body.zip_code)
		.execute(`update_address`);

	let data = await query;

	await db.close();

	res.send(data.recordset);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = route;
