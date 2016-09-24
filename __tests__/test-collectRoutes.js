import collectRoutes from '../modules/collectRoutes';
import React from 'react';
import {Router, Route, createMemoryHistory as createHistory, IndexRoute} from 'react-router';

const NodeComponent = React.createClass({
	render() {
		return this.props.children
	}
});

const LeafComponent = React.createClass({
	render() {
		return <p>Foo</p>
	}
});

Array.prototype.contains = function(obj){

	for(let i = 0; i < this.length; ++i){
		const item = this[i];
		// I'm lazy right now, that's why this guy isn't generic
		if(item.path === obj.path && item.alias == obj.alias){
			return true;
		}
	}

	return false;
};

describe("Collect Routes", () => {

	it("should create correct paths for simple non-recursive routes", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/app' component={LeafComponent} />
			<Route path = '/app2' component={LeafComponent} />
		</Router>;

		const paths  = collectRoutes(router);

		expect(paths.length).toBe(2);
		expect(paths.contains({path:'/app'}) ).toBeTruthy();
		expect(paths.contains({path:'/app2'}) ).toBeTruthy();
	});


	it("should create correct paths for simple recursive routes", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/path1' component={NodeComponent} >
				<Route path = '/test' component={LeafComponent} />
				<Route path = '/test/:id' component={LeafComponent} />
			</Route>
		</Router>;

		const paths  = collectRoutes(router);

		expect(paths.length).toBe(3);
		expect(paths.contains({path:'/path1'})).toBeTruthy();
		expect(paths.contains({path:'/path1/test'})).toBeTruthy();
		expect(paths.contains({path:'/path1/test/:id'})).toBeTruthy();
	});

	it("should create correct paths, not considering IndexRoute", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/path1' component={NodeComponent} >
				<IndexRoute component={NodeComponent} />
				<Route path = '/path1.1' component={NodeComponent} >
					<IndexRoute component={NodeComponent} />
					<Route path = '/test' component={LeafComponent} />
					<Route path = '/test/:id' component={LeafComponent} />
				</Route>
			</Route>
		</Router>;

		const paths  = collectRoutes(router);
		expect(paths.length).toBe(4);
	});


	it("should create correct paths for simple non-recursive routes considering aliases", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/app' component={LeafComponent} alias="alias"/>
			<Route path = '/app2' component={LeafComponent} alias="otherAlias" />
		</Router>;

		const paths  = collectRoutes(router);

		expect(paths.length).toBe(2);

		expect(paths.contains({
			path: '/app',
			alias: 'alias'})
		).toBeTruthy();

		expect(paths.contains({
			path: '/app2',
			alias: 'otherAlias'})
		).toBeTruthy();
	});
});

