/*jslint node: true */
"use strict";

var chai = require('chai');
var	expect = chai.expect;
chai.should();

// to create our test directory
var fs = require("fs");
var path = require("path");

var directory = "./testDir";
function setupTestDir(){
	// delete test dir if exsist
	deleteTestDir();
    	
	// test dir and test file
	fs.mkdirSync(directory);
	fs.openSync(path.join(directory , "test.js"), 'a');

	// test sub file and sub dir
	fs.mkdirSync(path.join(directory , directory));
	fs.openSync(path.join(directory , directory,"test.js"), 'a');
}

function deleteTestDir () {
	if (fs.existsSync(directory)) {
		// delete files
		 fs.unlinkSync(path.join(directory , "test.js"));
		 fs.unlinkSync(path.join(directory , directory, "test.js"));

		 // delet directory
	     fs.rmdirSync(path.join(directory , directory));
	     fs.rmdirSync(directory);
 	}
}

var fileInspectors = require('../fileInspector.js');


describe("Inspect files" , function () {

	var inspector = null;

	before(function(){
		setupTestDir();
  	});

	beforeEach(function () {
		inspector = new fileInspectors(directory);
		inspector.fileExtensionsList = function() {
			return [".js",".exe"];
		};
	});

	afterEach(function() {
		inspector = null;
	});

	describe("Extention List" ,function  () {
		
		it('Should have at least one extention in list' , function () {
			var count = inspector.fileExtensionsList().length;
			expect(count).to.be.above(1);
		});

	});


	describe("Search files" , function() {
		
		it("Should return true when directory is valid" , function() {
			var result = inspector.inspectFiles();
			
			result.should.be.true;
		});

		it("Should return false when directory is invalid" , function() {
			inspector = new fileInspectors("invalid director");
			var result = inspector.inspectFiles();
			
			result.should.be.false;
		});

		it("Should return two js files" , function() {
			inspector.inspectFiles();
			var count= inspector.files[0][1].length;

			expect(count).to.be.equal(2);
		});

		it("Should return zero exe files" , function() {
			inspector.inspectFiles();
			var count= inspector.files[1][1].length;

			expect(count).to.be.equal(0);
		});

		// TODO
		xit("Should return proper message when dirctory is not valid" , function() {
			
		});
	});
});