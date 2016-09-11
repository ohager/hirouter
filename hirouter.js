var React = require('react');
const createRouteFunction = require('./createRouteFunction');

const HiRouter = React.createClass({

	propTypes: {
		router: React.PropTypes.element.isRequired
	},

	childContextTypes: {
		nav: React.PropTypes.array
	},

	getInitialState: function () {
		return {
			nav: []
		}
	},

	getChildContext: function () {
		return {
			nav: this.state.nav
		}
	},

	createRouteFunction : function(path, alias){
		const suffix = "goTo";
		let name = alias;
		const analyzed = analyzePath(path);
		if(!name){
			name = analyzed.joinedTokens;
		}

		return {
			[`${suffix}${name}`]: (...args) => console.log("args",args)
		}
	},

	componentWillMount: function () {
		console.log("version", React.version);

		const routerElement = this.props.router;
		var paths = routerElement.props.children.map((c)=> {
			return {
				componentName: c.props.component.displayName,
				path: c.props.path
			}
		});
		this.setState({nav: paths});
	},

	render: function () {
		return this.props.router;
	}

});

module.exports = HiRouter;