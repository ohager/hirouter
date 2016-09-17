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


describe("Collect Routes", () => {

	it("simple non-recursive test", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path = '/app' component={AppComponent} />
			<Route path = '/app2' component={AppComponent} />
		</Router>;

		const paths  = collectRoutes(router);

		expect(paths.length).toBe(2);
		expect(paths[0]).toEqual("/app");
		expect(paths[1]).toEqual("/app2");
	});

});
