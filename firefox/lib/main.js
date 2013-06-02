var widgets = require("widget");
var tabs = require("tabs");
// Import the page-mod API
var pageMod = require("page-mod");
var self=require("self"); 
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
	include: [				
				"https://investea.aca.ntu.edu.tw/opinion/giveform3.asp", 
				"https://investea.aca.ntu.edu.tw/aca_doc/opinion/giveform3.asp",
				],
    contentScriptFile: [self.data.url("jquery-1.8.3.min.js"),
						self.data.url("jquery-ui.js"),
//						self.data.url("jquery.dataTables.js"),
//						self.data.url("jquery.dataTables.min.js"),
//						self.data.url("jquery.simplemodal-1.4.3.js"),
//						self.data.url("jquery.simplemodal.1.4.3.min.js"),
//						self.data.url("jquery.tablesorter.js"),
//						self.data.url("jquery.tablesorter.widgets.js"),
	                    self.data.url("core.js"),
	                    self.data.url("util.js"),
	                    self.data.url("sha1.js"),
//	                    self.data.url("slide.js"),
	                    self.data.url("script.js"),
//	                    self.data.url("hack.js")
						],

	contentStyleFile: [self.data.url("style.css"),
					 self.data.url("jquery-ui.css"),
					 self.data.url("slide.css"),
					 self.data.url("ajax_loading.css")
					 ]
});
