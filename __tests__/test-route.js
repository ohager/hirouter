const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Router = require('react-router').Router;
const createHistory = require('react-router').createMemoryHistory;
const Route = require('react-router').Route;
const HiRouter = require('../hirouter');

const Target = React.createClass({

	contextTypes: {
		router: React.PropTypes.any,
		test: React.PropTypes.any
	},

	render: function () {
		return (
			<p>Just A Test Target</p>
		)
	}
});

describe("HiRouter", () => {

	it("creates comfortable Routing function", () => {

		var history = createHistory("test");

		const router = <Router history={history}>
			<Route path="test" component={Target}/>
			<Route path="test2" component={Target}/>
		</Router>;
		
		const target = TestUtils.renderIntoDocument(<HiRouter router={router}/>);
	});

});
