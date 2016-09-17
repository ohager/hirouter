import {createRoutes} from 'react-router';

const DELIMITER = ' ';

/**
 * Creates a _single_ string containing all paths of a Routing Tree separated by a delimiter, i.e. SPACE
 * Note: returning a single string performs better than working on an array
 * @param routes
 * @param path
 * @returns {string}
 */
function collectPaths(routes, path='') {

	let newPath = '';
	for(let i=0; i<routes.length; ++i){
		const route = routes[i];
		if(route.childRoutes){
			newPath += collectPaths(route.childRoutes, route.path);
		}
		newPath += path + (route.path || '') + DELIMITER;
	}
	return newPath;

}

module.exports = function(routerElement){
	const routes = createRoutes(routerElement);
	const pathStr = collectPaths(routes).trim();
	return pathStr.split(DELIMITER);
};