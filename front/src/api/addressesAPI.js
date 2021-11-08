import $ from 'jquery';

//? importing the address list from Israel data.gov API into 'addrData' variable
  export var addrData = {
      resource_id: 'bf185c7f-1a4e-4662-88c5-fa118a244bda', // the resource id
      limit: 5, // get 5 results
      q: 'תל אביב' // query for 'jones'
  };
  $.ajax({
      url: 'https://data.gov.il/api/3/action/datastore_search',
      data: addrData,
      dataType: 'jsonp',
      success: function (data) {
          alert('Total results found: ' + data.result.total)
      }
  });