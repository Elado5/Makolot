var data = {
    resource_id: 'bf185c7f-1a4e-4662-88c5-fa118a244bda', // the resource id
    limit: 5, // get 5 results
    q: 'jones' // query for 'jones'
  };
let addRes = fetch({
    url: 'https://data.gov.il/api/3/action/datastore_search',
    data: data,
    dataType: 'jsonp',
    success: function(data) {
      alert('Total results found: ' + data.result.total)
    }})

//   export const addressesFETCH = async (url, body = undefined) => {
// 	try {
// 		let res = await fetch(url, {
//             resource:  'bf185c7f-1a4e-4662-88c5-fa118a244bda',
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: body ? JSON.stringify(body) : ""
// 		});
// 		let data = await res.json();
// 		return data;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

export default addRes;