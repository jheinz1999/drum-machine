var express = require('express');
var app = express();

app.get("/samples/:sample", function(req, res) {

  console.log("Sent " + req.params.sample);
  res.sendFile(__dirname + "/src/samples/" + req.params.sample);

});

app.listen(4000);

console.log("Running");
