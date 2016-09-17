import React from 'react';
import Renderer from 'react-test-renderer';
import {Router, IndexRoute, Route, createMemoryHistory as createHistory} from 'react-router';
import HiRouter from '../hirouter';


const AppComponent = React.createClass({
    render() {
        return this.props.children
    }
});

const IndexTestComponent = React.createClass({
	contextTypes: {
		router: React.PropTypes.any,
		nav: React.PropTypes.any
	},
	render() {
		return <p>{
			this.context.nav.goToIndex()
		}</p>
	}
});

const SingleTestComponent = React.createClass({

	contextTypes: {
		router: React.PropTypes.any,
		nav: React.PropTypes.any
	},

	render() {
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

	componentWillMount (){
		const nav = this.context.nav;
		let urls = [];

		urls.push(nav.goToTest());
		urls.push(nav.goToTestOther(100));

		this.setState( {urls : urls } );
	},

	render() {
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
            <Route path = '/' component={AppComponent} >
			    <Route path="test" component={SingleTestComponent}/>
            </Route>
		</Router>;
		
		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});

	it("renders MultipleTestComponent and returns list of urls (multiple routes)", () => {

		var history = createHistory("test/100/other");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
            <Route path = '/' component={AppComponent} >
			    <Route path="test" component={SingleTestComponent}/>
			    <Route path="test/:id/other" component={MultipleTestComponent}/>
            </Route>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});

	it("renders IndexTestComponent and returns '/'", () => {

		var history = createHistory("/");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
            <Route path = '/' component={AppComponent} >
				<Route path="test" component={SingleTestComponent}/>
			    <Route path="test/:id/other" component={MultipleTestComponent}/>
            </Route>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});



});
