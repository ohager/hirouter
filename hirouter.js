var React = require('React');
const analyzePath = require('./analyzePath');


const HiRouter = React.createClass({

	propTypes: {
		router: React.PropTypes.element.isRequired
	},

	childContextTypes: {
		test: React.PropTypes.array
	},

	getInitialState: function () {
		return {
			test: []
		}
	},

	getChildContext: function () {
		return {
			test: this.state.test
		}
	},

	createRouteFunction : function(path, alias){
		const suffix = "goTo";
		let name = alias;
		if(!name){
			name = this.createNiceNameFromPath(path);
		}

		return {
			name: `${suffix}${name}`,
			func: function(){

			}
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
		this.setState({test: paths});
	},

	render: function () {
		return this.props.router;
	}

});

module.exports = HiRouter;