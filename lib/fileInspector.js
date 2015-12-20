module.exports = function  (directoryToSearch) {
	this.directoryToSearch = directoryToSearch;

	this.files = null;

	// populate extension list
	this.fileExtensionsList = function getExtentionList() {
		return ['.js', '.html', '.json'];
	}

	// search directory 
	getFiles = function (dir, files){
		var fs = require('fs');
		var path = require('path');

	    var _files = fs.readdirSync(dir);
	    for (var i in _files){
	        var name = dir + '/' + _files[i];
	        var extention = path.extname(_files[i]);
	        if (fs.statSync(name).isDirectory()){
	        	getFiles(name, files);
	        } else {
	        	for (var i = 0; i < files.length; i++) {
	        		if(files[i][0] == extention){
	        			files[i][1].push(name);
	        			break;
	        		}
	        	}
	        }
	    }
	    return files;
	}

	// search directory 
	this.checkFiles = function () {
		this.files = [];

		// initial file list based on extensions
		var extentions = this.fileExtensionsList();
		for (var i = 0; i < extentions.length; i++) {
			var item =[];
			item[0] = extentions[i];
			item[1] = [];

			this.files.push(item); 
		}
	
		this.files = getFiles(this.directoryToSearch, this.files);
	}
}

