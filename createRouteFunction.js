const analyzePath = require('./analyzePath');

function createMountPathFunction(fn, pathInfo){

	const urlTemplate = pathInfo.path.replace(/:(\w*)/g,'${$1}');
	const body = 'return fn(`' + urlTemplate + '`)';
	return 	pathInfo.variables.length > 0 ?
		new Function('fn',pathInfo.variables, body).bind(null, fn) :
		new Function('fn', body).bind(null, fn);

}

function createRouteFunction(routingImpl, path, alias){
	const suffix = "goTo";
	let name = alias;
	const pathInfo = analyzePath(path);
	if(!name){
		name = pathInfo.joinedTokens;
	}
	const funcName = `${suffix}${name}`;
	return {
		[funcName]: createMountPathFunction.call(null, routingImpl, pathInfo )
	}
}

module.exports = createRouteFunction;