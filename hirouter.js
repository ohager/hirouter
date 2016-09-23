import React from 'react';
import createRouteFunction from './modules/createRouteFunction';
import defaultRoutingImpl from './modules/defaultRoutingImpl';
import collectRoutes from './modules/collectRoutes';

const HiRouterOptionsShape = {
	suffix : React.PropTypes.string,
	defaultPath : React.PropTypes.string
};

const HiRouter = React.createClass({

	propTypes: {
		router: React.PropTypes.element.isRequired,
		options : React.PropTypes.shape( HiRouterOptionsShape )
	},

	childContextTypes: {
		nav: React.PropTypes.object
	},

	getDefaultProps(){
		return {
			options : {
				suffix : "goTo",
				defaultPath : "Index",
				routingImpl: defaultRoutingImpl
			}
		}
	},

	getInitialState() {
		return {
			nav: {}
		}
	},

	getChildContext() {
		return {
			nav: this.state.nav
		}
	},

	componentWillMount() {

		const routerElement = this.props.router;
        const routes = collectRoutes(routerElement.props.children);
		const options = this.props.options;
		const routingImpl = options.routingImpl.bind(routerElement);

		const nav = routes.reduce( (prevObj,route) => {
			const r = createRouteFunction(routingImpl,route.path, route.alias, options);
			return Object.assign(prevObj, r);
		} , {});

		this.setState({nav: nav});
	},

	render: function () {
		return this.props.router;
	}

});

module.exports = HiRouter;