function _firstLetterUpperCase(s){
    return s ?  s[0].toUpperCase() + s.substring(1) : "";
}

function _purgeVariableName(v){
    if(v.length < 2) throw `Invalid variable '${v}'`;
    return v.replace(':','');
}

module.exports = {
    firstLetterUpperCase : _firstLetterUpperCase,
    purgeVariableName : _purgeVariableName
};
