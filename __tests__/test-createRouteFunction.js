const createRouteFunction = require('../createRouteFunction');

function routingImpl(url){
	return url;
}

describe("create Route functions", () => {

	it("without variables", () => {
		const path = "/test";
		const result = createRouteFunction(routingImpl, path);

		expect(result.goToTest).toBeDefined();
		expect(result.goToTest()).toBe("/test");
	});


	it("with uri variable", () => {
		let path = "/test/:id";
		let result = createRouteFunction(routingImpl, path);

		expect(result.goToTest).toBeDefined();
		expect(result.goToTest(100)).toBe("/test/100");

		path = "/test/:id/details";
		result = createRouteFunction(routingImpl, path);

		expect(result.goToTestDetails).toBeDefined();
		expect(result.goToTestDetails(100)).toBe("/test/100/details");
	});

	it("with multiple uri variables", () => {
		const path = "/order/:id/product/:productId/details";
		const result = createRouteFunction(routingImpl, path);

		expect(result.goToOrderProductDetails).toBeDefined();
		expect(result.goToOrderProductDetails(1,"deadbeef")).toBe("/order/1/product/deadbeef/details");
	});

});
