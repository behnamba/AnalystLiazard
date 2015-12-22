"use strict";

// get the directory
var directoryToSearch = process.argv.slice(2)[0];
if(directoryToSearch === undefined){
	return console.log("You need to define the directory of your project");
}

var showFilesList = process.argv.slice(2)[1];


// find and group by files based on file extensions
var fileInspectors = require('./fileInspector.js');
var inspector = new fileInspectors(directoryToSearch);

if(inspector.inspectFiles()){
	console.log("The search results:");

	for (var i = 0; i < inspector.files.length; i++) {
	    console.log(inspector.files[i][0] + ": " + inspector.files[i][1].length);

	    if(showFilesList!==undefined && Boolean(showFilesList)){
	    	for (var j = 0; j < inspector.files[i][1].length; j++) {
	    			console.log((inspector.files[i][1])[j]);
	    	}	
	    }
	}
}
