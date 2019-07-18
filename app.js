const https = require('https');
const http = require('http');
var _ = require('underscore');

var result = _.contains([1, 2, 3], 2)

console.log(result)

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.write('Hello World');
		res.end();
	}
	if (req.url === '/api') {
		https.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22', (resp) => {
		  let data = '';
		  // A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });
		  // The whole response has been received. Print out the result.
		  resp.on('end', () => {
		  	res.write(data);
		  	res.end();
		    console.log(JSON.parse(data));
		  });

		}).on("error", (err) => {
		  console.log("Error: " + err.message);
		});
	}
});

server.listen(3000);

console.log("Listening on port 3000")

// making note