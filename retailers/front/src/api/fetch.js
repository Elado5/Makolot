//*We define the GET/POST/PUT/DELETE functions, each do the proccess of:
//? 1. taking a url and/or params/body
//? 2. fetching the url with the chosen method (GET/POST/PUT/DELETE) and saving it in 'res' variable
//? 3. changing res to json format and saving in 'data' variable
//? 4. returning the result (data) 

export const GET = async (url, params = undefined) => {
	try {
		if (params) {
			url += params.join("/"); //takes all parameters and puts a / between them
		}
		let res = await fetch(url, { method: "GET" });
		let data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const POST = async (url, body = undefined) => {
	try {
		let res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: body ? JSON.stringify(body) : ""
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const PUT = async (url, params = undefined, body = undefined) => {
	try {
		if (params) {
			url += params.join("/"); //takes all parameters and puts a / between them
		}
		let res = await fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: body ? JSON.stringify(body) : ""
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const DELETE = async (url, params = undefined) => {
	try {
		if (params) {
			url += params.join("/"); //takes all parameters and puts a / between them
		}
		let res = await fetch(url, {
			method: "DELETE",
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
