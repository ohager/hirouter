# hirouter
React Router wrapper for better routing experience

*NOT WORKING YET*

# objective

When this thing is ready it should be able to provide nice named
routing functions.

Example:

```jsx
const router = <Router history={history}>
	<Route path="product/:id" component={ProductListContainer}/>
</Router>

render( <HiRouter router={router} />, document.getElementById('root') )
```

Inside _ProductContainer_ you shall access

```jsx
class ProductListContainer extends React.Component {
	constructor(){
		super()
	}
	
	// ...
	
	render(){
		return <ProductList onSelectedProduct={context.goToProduct} />
	}
}
```


