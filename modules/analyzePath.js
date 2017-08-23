import {purgeVariableName, firstLetterUpperCase} from "./utils";


function isVariable(v){
	return v.indexOf(':') >= 0;
}

function isNotVariable(v){
	return !isVariable(v);
}


function analyzePath(path) {
	const parts = path.split('/');
	const partsWithoutVars = parts.filter( isNotVariable );
	const partsOnlyVars = parts.filter( isVariable );

	return {
		path : path,
		joinedTokens: partsWithoutVars.map( firstLetterUpperCase ).join(''),
		variables : partsOnlyVars.map( purgeVariableName )
		}
}

export default analyzePath;