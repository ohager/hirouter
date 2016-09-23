import {purgeVariableName, firstLetterUpperCase} from "./utils";

function analyzePath(path) {
	const parts = path.split('/');
	const partsWithoutVars = parts.filter((p) => { return p[0] !== ':'; });
	const partsOnlyVars = parts.filter((p) => { return p[0] === ':'; });

	return {
		path : path,
		joinedTokens: partsWithoutVars.map( firstLetterUpperCase ).join(''),
		variables : partsOnlyVars.map( purgeVariableName ),
		}
}

module.exports = analyzePath;