var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res, err)=>{
    if(err) throw err;
    fs.readFile('../db/data.json', 'utf-8', (err, data)=>{
        if(err) throw err;
        res.write(data);
    })
})

console.log("listening to 8080")
server.listen(8080);