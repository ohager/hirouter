function firstLetterUpperCase(s){
    return s ?  s[0].toUpperCase() + s.substring(1) : "";
}

function purgeVariableName(v){
    if(v.length < 2) throw `Invalid variable '${v}'`;
    return v.replace(/[:()]/g,'');
}

function purifyUrl(url){
    let u = url.replace('undefined', '').replace('//','/');
    if(u !== '/' && u[u.length-1] === '/'){
        u = u.substring(0, u.length-1);
    }
    return u;
}

export { firstLetterUpperCase, purgeVariableName, purifyUrl };
