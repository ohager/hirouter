import React from 'react';
import {connect} from '../src/index';
import Nanoflux from 'nanoflux';
import {mount, render, shallow} from "enzyme";


// --------------------- Nanoflux Setup -------------------------------

const defaultDispatcher = Nanoflux.getDispatcher();

let testState = {
	test: 'initial',
};

// state selector
const getTestState = () => testState.test;

const storeDescriptor = {
	onTestAction: function (arg) {
		testState.test = arg;
		this.notify(testState);
	},
};

const actionDescriptor = {
	testAction: function (message) {
		this.dispatch('testAction', message);
	},
};

// connect stores to dispatcher
defaultDispatcher.connectTo([
	Nanoflux.createStore('testStore', storeDescriptor),
]);

// setup actions for dispatcher
Nanoflux.createActions('testActions', defaultDispatcher, actionDescriptor);

// --------------------- Nanoflux Setup End ----------------------------


class Test extends React.Component{
	render() {
		return <h2>Test, {`${this.props.testProp}`} </h2>
	}
}

const mapStateToProps = {
	testProp: () => getTestState()
};

describe("nanoflux-react.connect", () => {
		
		it("renders App with mapped state to props using *single* store ", () => {
			
			const testComponent = connect('testStore', mapStateToProps)(Test);
			const wrapper = shallow(React.createElement(testComponent));
			
			expect(wrapper.props().testProp).toBeDefined();
			expect(wrapper.props().testProp).toBe('initial');
			expect(wrapper).toMatchSnapshot()
		})
	}
);


