const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../Utils/config`);

let route = express.Router();


route.get(`/all`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = db.request().query(`SELECT * FROM CreditCards`);

    let data = await query.recordset;

    await db.close();

    res.send(data);

})


route.post(`/add`, async (req, res) => {

    let body = req.body;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = db.request()
    .input(`credit_card_number`, sql.VarChar(16), body.credit_card_number)
    .input(`credit_card_date`, sql. NVarChar(5), body.credit_card_date)
    .input(`credit_card_cvv`, sql.VarChar(4), body.credit_card_cvv)
    .input(`credit_card_name`, sql.NVarChar(150), body.credit_card_name)
    .execute(`add_credit_card`);

    let data = await query;

    await db.close();

    res.send(data);

})

route.put(`/update/:id`, async (req, res) => {

    let body = req.body;
    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = db.request()
    .input(`credit_card_id`, sql.Int, params.id)
    .input(`credit_card_number`, sql.VarChar(16), body.credit_card_number)
    .input(`credit_card_date`, sql. NVarChar(5), body.credit_card_date)
    .input(`credit_card_cvv`, sql.VarChar(4), body.credit_card_cvv)
    .input(`credit_card_name`, sql.NVarChar(150), body.credit_card_name)
    .execute(`update_credit_card`);

    let data = await query;

    await db.close();

    res.send(data);

})

route.delete(`/delete/:id`, async (req, res) => {

    let params = req.params;

    sql.on(`error`, (error) => res.send(error));

    let db = await sql.connect(config.db);

    let query = db.request()
    .input(`credit_card_id`, sql.Int, params.id)
    .execute(`delete_credit_card`);

    let data = await query;

    await db.close();

    res.send(data);

})


module.exports = route;