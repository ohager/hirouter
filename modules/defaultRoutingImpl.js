function defaultRoutingImpl(url){
	// 'this' is the router passed for HiRouters property
	this.props.history.push(url);
}

export default defaultRoutingImpl;