const collectRoutes = require('../modules/collectRoutes');
import React from 'react';
import {Router, Route, createMemoryHistory as createHistory} from 'react-router';

const AppComponent = React.createClass({
	render() {
		return this.props.children
	}
});

const TestComponent = React.createClass({
	render() {
		return <p>Foo</p>
	}
});

Array.prototype.contains = function(str){
	return this.find( (e) => e === str ) !== undefined;
};

describe("Collect Routes", () => {

	it("simple non-recursive test", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/app' component={TestComponent} />
			<Route path = '/app2' component={TestComponent} />
		</Router>;

		const paths  = collectRoutes(router);

		expect(paths.length).toBe(2);
		expect(paths.contains('/app') ).toBeTruthy();
		expect(paths.contains( '/app2') ).toBeTruthy();
	});


	it("simple recursive test", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/app' component={AppComponent} >
				<Route path = '/test' component={TestComponent} />
			</Route>
		</Router>;

		const paths  = collectRoutes(router);

		expect(paths.length).toBe(2);
		expect(paths.contains('/app')).toBeTruthy();
		expect(paths.contains('/app/test')).toBeTruthy();
	});

});

