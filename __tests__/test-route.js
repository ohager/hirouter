const React = require('react');
const Renderer = require('react-test-renderer');
const Router = require('react-router').Router;
const createHistory = require('react-router').createMemoryHistory;
const Route = require('react-router').Route;
const HiRouter = require('../hirouter');
const defaultRoutingImpl = require('../modules/defaultRoutingImpl');

const SingleTestComponent = React.createClass({

	contextTypes: {
		router: React.PropTypes.any,
		nav: React.PropTypes.any
	},

	render: function () {
		return <p>{
			this.context.nav.goToTest()
		}</p>
	}
});

const MultipleTestComponent = React.createClass({

	contextTypes: {
		router: React.PropTypes.any,
		nav: React.PropTypes.any
	},

	componentWillMount : function(){
		const nav = this.context.nav;
		let urls = [];

		urls.push(nav.goToTest());
		urls.push(nav.goToTestOther(100));

		this.setState( {urls : urls } );
	},

	render: function () {
		return <ul>{ this.state.urls.map( (url, index) => <li key={index}>{url}</li>) }</ul>
	}
});

// this neat thing is injected to HiRouter to simulate routing.
function testRoutingImpl(url) {
	return url;
}



describe("HiRouter", () => {

	it("renders SingleTestComponent returning its own url (single route only)", () => {

		var history = createHistory("test");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
			<Route path="test" component={SingleTestComponent}/>
		</Router>;
		
		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});

	it("renders MultipleTestComponent and returns list of urls (multiple routes)", () => {

		var history = createHistory("test/100/other");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
			<Route path="test" component={SingleTestComponent}/>
			<Route path="test/:id/other" component={MultipleTestComponent}/>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});

});
