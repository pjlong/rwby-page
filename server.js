var http = require('http'),
  fs = require('fs');
  url = require('url'),
  path = require('path');

var server = http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write('404 Not Found\n');
        response.end();
        return;
      }
      if (fs.statSync(filename).isDirectory()) filename += '/index.html'

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          response.writeHead(500, {"Content-Type": "type/plain"});
          response.write(err + "\n");
          response.end();
          return
        }
        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });  

    });
});

var port = 8080;
server.listen(port, function () {
  console.log('Server Listening on port ' + port);
});