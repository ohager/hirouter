const collectRoutes = require('../modules/collectRoutes');
import React from 'react';
import {Router, Route, createMemoryHistory as createHistory} from 'react-router';

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

Array.prototype.contains = function(str){
	return this.find( (e) => e === str ) !== undefined;
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
		expect(paths.contains('/app') ).toBeTruthy();
		expect(paths.contains( '/app2') ).toBeTruthy();
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
		expect(paths.contains('/path1')).toBeTruthy();
		expect(paths.contains('/path1/test')).toBeTruthy();
		expect(paths.contains('/path1/test/:id')).toBeTruthy();
	});

	it("should create correct paths for complex routing structure", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/path1' component={NodeComponent} >
				<Route path = '/path1.1' component={NodeComponent} >
					<Route path = '/test' component={LeafComponent} />
					<Route path = '/test/:id' component={LeafComponent} />
				</Route>
			</Route>
			<Route path = '/path2' component={NodeComponent} >
				<Route path = '/test' component={LeafComponent} />
			</Route>
		</Router>;

		const paths  = collectRoutes(router);

		expect(paths.length).toBe(6);
		expect(paths.contains('/path1')).toBeTruthy();
		expect(paths.contains('/path1/path1.1')).toBeTruthy();
		expect(paths.contains('/path1/path1.1/test')).toBeTruthy();
		expect(paths.contains('/path1/path1.1/test/:id')).toBeTruthy();
		expect(paths.contains('/path2')).toBeTruthy();
		expect(paths.contains('/path2/test')).toBeTruthy();
	});

});

