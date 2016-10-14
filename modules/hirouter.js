import React from 'react';
import createRouteFunction from './createRouteFunction';
import defaultRoutingImpl from './defaultRoutingImpl';
import collectRoutes from './collectRoutes';

const HiRouterOptionsShape = {
	prefix : React.PropTypes.string,
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
				prefix : "goTo",
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
			return r ? Object.assign(prevObj, r) : prevObj;
		} , {});

		this.setState({nav: nav});
	},

	render: function () {
		return this.props.router;
	}

});

export default HiRouter