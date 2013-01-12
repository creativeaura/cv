/*global $, window, CanvasLoader, jQuery, alert, require */
/*jslint browser:true, devel:true, unused:false */


({
	appDir: '../app',
	baseUrl: 'scripts',
	dir: '../deploy',
	mainConfigFile : '../app/scripts/config.js',
  findNestedDependencies: true,
	modules: [{
		name: 'config'
	}]
})
