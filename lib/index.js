var directoryToSearch = process.argv.slice(2)[0];

var fileInspectors = require('./fileInspector.js');
var inspector = new fileInspectors(directoryToSearch);
inspector.checkFiles();

console.log("The results");
for (var i = 0; i < inspector.files.length; i++) {
    console.log(inspector.files[i][0] + ": " + inspector.files[i][1].length);
};
