var data = require("./allvideos.json");

for (var i = 0; i < data.length; i++) {
  console.log('wget -O - "http://videogrep.com' + data[i].transcript + '" > ' + data[i]._id + ".json");
}
