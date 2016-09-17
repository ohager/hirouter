[![Build Status](https://travis-ci.org/ohager/hirouter.svg?branch=master)](https://travis-ci.org/ohager/hirouter)
[![codecov](https://codecov.io/gh/ohager/hirouter/branch/master/graph/badge.svg)](https://codecov.io/gh/ohager/hirouter)
[![GetBadges Game](https://ohager-hirouter.getbadges.io/shield/company/ohager-hirouter/user/8773)](https://ohager-hirouter.getbadges.io/?ref=shield-player)

# hirouter
React Router wrapper for a even better routing experience.

A first rough version works, able to create convenience routing functions.
The idea is to keep the urls centralized (on your routers configuration) and using
functions like _this.context.nav.goToOrder(orderId)_ instead of pushing the URLs manually to the routers
history (usually like this _this.context.router.push(\`/order/${orderId}\`)_ )
The neat thing is, that the functions are created automatically, based on your routes.

> note: Currently, only basic nested routes are supported

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

Inside _ProductListContainer_ you shall access

```jsx
class ProductListContainer extends React.Component {
	constructor(){
		super() 
	}
	
	handleSelectedProduct(id){
		context.nav.goToProduct(id);
	}
	
	render(){
		return <ProductList onSelectedProduct={handleSelectedProduct.bind(this)} />
	}
}

ProductListContainer.contextTypes = {
  nav: React.PropTypes.object
};

```
