var React = require('react');
const createRouteFunction = require('./createRouteFunction');

const HiRouterOptionsShape = {
	suffix : React.PropTypes.string,
	defaultPath : React.PropTypes.string,
	alias: React.PropTypes.string
};



const HiRouter = React.createClass({

	propTypes: {
		router: React.PropTypes.element.isRequired,
		options : React.PropTypes.shape( HiRouterOptionsShape )
	},


	getDefaultProps : function(){
		return {
			options : {
				suffix : "goTo",
				defaultPath : "Index",
				alias: "",
				routingImpl: (url) => url
			}
		}
	},

	childContextTypes: {
		nav: React.PropTypes.object
	},

	getInitialState: function () {
		return {
			nav: {}
		}
	},

	getChildContext: function () {
		return {
			nav: this.state.nav
		}
	},

	componentWillMount: function () {

		const routerElement = this.props.router;
		const components = [].concat(routerElement.props.children);
		const options = this.props.options;

		const nav = components.reduce( (p,c) => {
			const r = createRouteFunction(options.routingImpl,c.props.path, options);
			return Object.assign(p, r);
		} , {});

		this.setState({nav: nav});
	},

	render: function () {
		return this.props.router;
	}

});

module.exports = HiRouter;