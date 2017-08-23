import {createRoutes} from 'react-router';

const DELIMITER = ' ';
const ALIAS_DELIMITER = '@';

/**
 * Creates a _single_ string containing _all_ paths of a Routing Tree.
 * The format of each token is 'path[@alias]', where alias is optional.
 * Note: returning a single string performs better than working on an array
 * @param routes
 * @param path
 * @returns {string}
 */
function collectPaths(routes, path='') {

	let newPath = '';
	for(let i=0; i<routes.length; ++i){
		const route = routes[i];

		const routePath = path + (route.path || '');

		if(route.childRoutes){
			newPath += collectPaths(route.childRoutes, routePath);
		}

		const alias = route.alias ? ALIAS_DELIMITER + route.alias : '';
		newPath += routePath + alias + DELIMITER;
	}
	return newPath;

}

export default function(routerElement){
	const routes = createRoutes(routerElement);
	const pathStr = collectPaths(routes).trim();
	const pathArray = pathStr.split(DELIMITER);
	return pathArray.map( (p) => {
		const pa = p.split(ALIAS_DELIMITER);
		return {
			path : pa[0],
			alias : pa[1] || undefined
		}
	} )
};