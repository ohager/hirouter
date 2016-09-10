function firstLetterUpperCase(s) {
	return s ?  s[0].toUpperCase() + s.substring(1) : "";
}

function purgeVarName(v){
	if(v.length < 2) throw `Invalid variable '${v}'`;
	return v.substring(1);
}

function createNiceNameFromPath(path) {
	const parts = path.split('/');
	const partsWithoutVars = parts.filter((p) => { return p[0] !== ':'; });
	const partsOnlyVars = parts.filter((p) => { return p[0] === ':'; });

	return {
		joinedTokens: partsWithoutVars.map( firstLetterUpperCase ).join(''),
		variables : partsOnlyVars.map( purgeVarName ),
		}
}

module.exports = createNiceNameFromPath;