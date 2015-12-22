module.exports = function  (directoryToSearch) {
	this.directoryToSearch = directoryToSearch;

	this.files = null;

	// populate extension list
	this.fileExtensionsList = function getExtentionList() {
		return ['.js', '.html', '.json'];
	};

	// recursive func to to process dir and subdirs
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
	};

	this.inspectFiles = function () {
		this.files = [];

		// initial file list based on extensions
		var extentions = this.fileExtensionsList();
		for (var i = 0; i < extentions.length; i++) {
			var item =[];
			item[0] = extentions[i];
			item[1] = [];

			this.files.push(item); 
		}
	
		try{
			// search directory
			this.files = getFiles(this.directoryToSearch, this.files);
			return true;
		}
		catch(ex){
			// TODO: log errors
			console.log("oops, There was an error in searching directory. Please make sure directory is accessible and try again!");
			return false;
		}		
	};
};

