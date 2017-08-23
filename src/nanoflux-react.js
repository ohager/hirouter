import React from "react";
import Nanoflux from 'nanoflux';

export function withActions(actions, actionMapper) {
	return function (component) {
		
		return class NanofluxActionsConnector extends React.Component {
		
			static __mapActions() {
				const actionObj = typeof(actions) === 'string' ? Nanoflux.getActions(actions) : actions;
				const actionMap = actionMapper(actionObj);
				let mappedActions = {};
				Object.keys(actionMap).forEach(p => {
					mappedActions[p] = actionMap[p].bind(actionObj);
				});
				
				return mappedActions;
			}
			
			render() {
				let props = Object.assign({}, this.props);
				props.actions = Object.assign({}, props.actions, NanofluxActionsConnector.__mapActions());
				return React.createElement(component, props)
			}
		}
	}
}

export function connect(store, stateToPropsMapper) {
	return function (component) {
		
		return class NanofluxStoreConnector extends React.Component {
			
			static __mapStoreState() {
				let state = {};
				Object.keys(stateToPropsMapper).forEach(p => {
					state[p] = stateToPropsMapper[p]()
				});
				return state;
			}
			
			constructor(props) {
				super(props);
				
				const storeObj = typeof(store) === 'string' ? Nanoflux.getStore(store) : store;
				
				this.state = NanofluxStoreConnector.__mapStoreState();
				this.subscription = storeObj.subscribe(this, this.__onStoreUpdate);
			}
			
			componentWillUnmount() {
				this.subscription.unsubscribe();
			}
			
			__onStoreUpdate() {
				this.setState(NanofluxStoreConnector.__mapStoreState())
			}
			
			
			shouldComponentUpdate(nextState) {
				return nextState !== this.state;
			}
			
			render() {
				return React.createElement(component, Object.assign({}, this.props, this.state))
			}
			
		}
		
	}
}

