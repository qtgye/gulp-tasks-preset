const path = require('path');
const fs = require('fs-extra');
const {filesSync} = require('fs-walk');


module.exports = (function () {

  const tools = [];
	
  // Get list of all tools available
  filesSync(path.resolve(__dirname), (basedir, filename, stat) => {
      if ( !/^index\.js$/.test(filename) ) {
        tools.push(filename.replace(/\.js$/, '')); // Add filename to list without the extension
      }
  })

  // Return a map of tools, keyed acc. to tool name
  return tools.reduce((map, tool) => {
		try {
			map[tool] = require(path.resolve(__dirname, `${tool}.js`));
		} catch (err) {
			console.log(`${tool} cannot be loaded! Either missing or there is an error:`.red);
      console.log(err);
		}
		return map;
	}, {});

})();
