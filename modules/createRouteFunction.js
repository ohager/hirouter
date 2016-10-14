import { firstLetterUpperCase, purifyUrl } from "./utils";
import analyzePath from './analyzePath';

function routeFunction(fn, pathInfo, obj){

	let url = pathInfo.path;

	pathInfo.variables.forEach( v => {
		const pattern = `\\(?:${v}\\)?`;
		const regex = new RegExp(pattern, 'ig');
		url = url.replace(regex, (obj ? obj[v] : undefined));
	});

	return fn(purifyUrl(url))
}

const defaultOpts = {
	prefix : "goTo",
	defaultPath : "Index"
};

function createRouteFunction(routingImpl, path, alias, opts = defaultOpts){

	if(path.indexOf('*') !== -1) return null;

	opts = Object.assign({},defaultOpts,opts);

	let name = firstLetterUpperCase(alias);
	const pathInfo = analyzePath(path);
	if(!name){
		name = pathInfo.joinedTokens.length === 0 ? opts.defaultPath : pathInfo.joinedTokens;
	}
	const funcName = `${opts.prefix}${name}`;
	return {
		[funcName]: routeFunction.bind(null, routingImpl, pathInfo )
	}
}

export default createRouteFunction;