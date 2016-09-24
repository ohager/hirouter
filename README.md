[![Build Status](https://travis-ci.org/ohager/hirouter.svg?branch=master)](https://travis-ci.org/ohager/hirouter)
[![codecov](https://codecov.io/gh/ohager/hirouter/branch/master/graph/badge.svg)](https://codecov.io/gh/ohager/hirouter)
[![GetBadges Game](https://ohager-hirouter.getbadges.io/shield/company/ohager-hirouter/user/8773)](https://ohager-hirouter.getbadges.io/?ref=shield-player)

# HiRouter
__HiRouter__ is a React High Order Component for the famous React Router for a even better routing experience.

__HiRouter__ is capable to create convenience navigation functions.
The idea is to keep the urls centralized (on your routers configuration) and using
functions like _goToOrder(orderId)_ instead of pushing the URLs manually to the routers
history (usually like this _router.push(\`/order/${orderId}\`)_ )

__HiRouter__ creates the navigation functions _automagically_, with arguments and names according to the
route patterns, i.e.

`bats/:hardly/hit/:balls/crazy` turns into `goToBatsHitCrazy(arg1, arg2)`

Advantage:
 - Centralized route definitions (better maintainability)
 - More expressive navigation (always nice)
 - Comfort (good for our lazy souls)

## Example

Example:

This is a typical routing tree for react-router. Once defined your routes,
you simply pass the router as parameter to the HiRouter. 
Using Reacts context declaration enables you to access the created navigation functions. 

```js
const router = <Router history={history}>
    <Route path="/" component={App}>
        // IndexRoutes are considered also
        <IndexRoute component={App}/>
	    <Route path="product/:id" component={ProductListContainer}/>
	    // HiRouter also works recursively
	    <Route path="client/" component={ClientContainer}>
	        // in the next line we use an *alias* parameter for better naming
	        <Route path=":clientId/order" component={ClientOrderListContainer} alias="ClientOrderList" />	        
	        <Route path=":clientId/order/:orderId" component={ClientOrder} />	        
	        <Route path=":clientId/order/:orderId/status" component={ClientOrderStatus} />	        
	    </Route>
</Router>

// use the High Order Component (HOC) HiRouter
render( <HiRouter router={router} />, document.getElementById('root') )
```

Inside _ProductListContainer_ you can access convenient routing/navigation functions

```js
class ProductListContainer extends React.Component {
	constructor(){
		super() 
	}
	
	handleSelectedProduct(id){
	    // here we can conveniently navigate to the specific component
	    // *without* knowing the underlying url.
	    // mind, that the functions accept arguments according the routes pattern
		context.nav.goToProduct(id);
		// also available are
		/*
		context.nav.goToIndex() // default		
		context.nav.goToClientOrderList(clientId) // from alias for customized naming
		context.nav.goToClientOrder(clientId, orderId) // of course, multiple args!
		context.nav.goToClientOrderStatus(clientId, orderId)		
		*/
	}
	
	render(){
		return <ProductList onSelectedProduct={handleSelectedProduct.bind(this)} />
	}
}

// IMPORTANT: declare the usage of hirouters navigation context.
ProductListContainer.contextTypes = {
  nav: React.PropTypes.object
};

```


## Options

__HiRouter__ allows some tweaking. 

Currently, options for function naming but also for routing internals are available.
Available options are:

- `suffix` : changes the first naming part of the navigation function
- `defaultPath` : changes the second naming part of IndexRoute functions
- `routingImpl`: a function used for routing (usually, you won't use this)

The default options are:

```js
options : {
    suffix : "goTo",
    defaultPath : "Index",
    routingImpl: (url) => { this.props.history.push(url); }
}
```

Suppose, we configure our HiRouter like this


```js
const router = 
  <Router history={history}>
    <Route path="/" component={App}>
        // IndexRoutes are considered also
        <IndexRoute component={App}/>
	    <Route path="product/:id" component={ProductListContainer} alias="Schawarma"/>
  </Router>

const options = {
  suffix: "mazelTov",
  defaultPath: "TohuWaBohu"
}

render( <HiRouter router={router} options={options}/>, document.getElementById('root') );
```

then HiRouter creates the following navigation functions:

- `mazelTovTohuWaBohu()`
- `mazelTovSchawarma(arg1)`

### Routing Implementation Function

The default routing function can be exchanged by a customized routing function, for whatever reasons.
Its current default implementation simply pushes the url to the react-routers history - So, no rocket-science here. 

```javascript
function defaultRoutingImpl(url){
	// 'this' is the react-router instance passed as HiRouters *router* property
	this.props.history.push(url);
}
```