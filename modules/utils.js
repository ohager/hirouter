function firstLetterUpperCase(s){
    return s ?  s[0].toUpperCase() + s.substring(1) : "";
}

function purgeVariableName(v){
    if(v.length < 2) throw `Invalid variable '${v}'`;
    return v.replace(':','');
}

export { firstLetterUpperCase, purgeVariableName };
