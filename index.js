const request = require('request');

exports.handler = (event, context, callback) => {
    // TODO implement
    console.log(event.detail.EC2InstanceId);
	var reqUrl = 'https://api.stackify.com:443/api/Device/RemoveServerByEC2ID/'+event.detail.EC2InstanceId;
	var request = require('request');

	var options = {
		url: reqUrl,
		headers: {
    		'X-Stackify-Key': process.env.Stackify_ApiKey
		},
		method: 'POST'
	};
	
	function stackify_callback(error, response, body) {
		  console.log('Response: ' + response.statusCode);
		  console.log('Body: ' + body);
		  if(response.statusCode == 200){
				callback(null,"Deleted " + event.detail.EC2InstanceId);	  	
		  }
		  else{
		  		callback(null,"Failed to delete " + event.detail.EC2InstanceId);
		  }
	}

	request(options,stackify_callback)

};