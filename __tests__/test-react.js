const React = require('react');
const renderer = require('react-test-renderer');

it('renders correctly', () => {
	const tree = renderer.create(
		<h1>Hello, World</h1>
	).toJSON();
	expect(tree).toMatchSnapshot();
});