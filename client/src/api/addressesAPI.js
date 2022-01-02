
export const ADDRESS_DATA = async (limit, q = undefined) => {
	try {
        let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&limit=${limit}`
		if(q)
            url += `&q=${q}`
        let res = await fetch(url, { method: "GET" });
        let data = await res.json();
		return data.result.records;
	} catch (error) {
		console.error(error);
	}
};
