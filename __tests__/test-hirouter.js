import React from 'react';
import Renderer from 'react-test-renderer';
import {Router, IndexRoute, Route, createMemoryHistory as createHistory} from 'react-router';
import HiRouter from '../modules/hirouter';


const AppComponent = React.createClass({
    render() {
        return this.props.children
    }
});


const AsteriskTestComponent = React.createClass({
	contextTypes: {
		router: React.PropTypes.any,
		nav: React.PropTypes.any
	},

	renderFuncNames : function(){
		const nav = this.context.nav;
		let elements = [];
		let i=0;
		for(let p in nav){
			if(nav.hasOwnProperty(p)){
				elements.push(<li key={++i}>{p}</li>)
			}
		}
		return elements;
	},

	render() {

		return (<p>
					<ul>
						{this.renderFuncNames()}
					</ul>
				</p>)
	}
});


const OptionalVarTestComponent = React.createClass({
	contextTypes: {
		nav: React.PropTypes.any
	},

	render() {
		return(
		<ul>
			<li>{this.context.nav.goToTest({pony:'foo'})}</li>
			<li>{this.context.nav.goToTest()}</li>
		</ul>
		)
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
		urls.push(nav.goToTestOther({id:100}));

		this.setState( {urls : urls } );
	},

	render() {
		return <ul>{ this.state.urls.map( (url, index) => <li key={index}>{url}</li>) }</ul>
	}
});


const AliasTestComponent = React.createClass({

	contextTypes: {
		router: React.PropTypes.any,
		nav: React.PropTypes.any
	},

	componentWillMount (){
		const nav = this.context.nav;
		let urls = [];

		urls.push(nav.goToAlternative());
		urls.push(nav.goToAlternative2({id:100}));

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
				<IndexRoute component={IndexTestComponent}/>
				<Route path="test" component={SingleTestComponent}/>
			    <Route path="test/:id/other" component={MultipleTestComponent}/>
            </Route>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});

	it("renders AliasTestComponent and returns list of Urls", () => {

		var history = createHistory("/test/:id/other");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
            <Route path = '/' component={AppComponent} >
				<Route path="test" component={SingleTestComponent} alias="alternative"/>
			    <Route path="test/:id/other" component={AliasTestComponent} alias="alternative2"/>
            </Route>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});


	it("ignores '*' routes", () => {

		var history = createHistory("/something/other.jpg");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
            <Route path = '/' component={AppComponent} >
				<Route path="test/*" component={AsteriskTestComponent}/>
				<Route path="test/*/foo" component={AsteriskTestComponent} alias="SomeName"/>
				<Route path="**/*.jpg" component={AsteriskTestComponent}/>
            </Route>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});

	it("considers optional '(:pony)' variable #1", () => {

		var history = createHistory("/test/foo");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
            <Route path = '/' component={AppComponent} >
				<Route path="test" component={OptionalVarTestComponent}/>
				<Route path="test/(:pony)" component={OptionalVarTestComponent}/>
            </Route>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});

	it("considers optional '(:pony)' variable #2", () => {

		var history = createHistory("/test");
		const testOptions = { routingImpl :  testRoutingImpl };

		const router = <Router history={history}>
            <Route path = '/' component={AppComponent} >
				<Route path="test" component={OptionalVarTestComponent}/>
				<Route path="test/(:pony)" component={OptionalVarTestComponent}/>
            </Route>
		</Router>;

		const tree = Renderer.create(<HiRouter router={router} options={testOptions}/>);
		expect(tree).toMatchSnapshot();

	});



});
