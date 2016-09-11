const createRouteFunction = require('../modules/createRouteFunction');

function routingImpl(url){
	return url;
}

describe("create Route functions", () => {

	it("for empty path", () => {
		const path = "/";
		const result = createRouteFunction(routingImpl, path);

		expect(result.goToIndex).toBeDefined();
		expect(result.goToIndex()).toBe("/");
	});

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

	it("with options #1", () => {
		const path = "/order/:id";
		const opts = {
			suffix: "geheZu",
			alias : "Bestellung"
		};
		const result = createRouteFunction(routingImpl, path, opts );

		expect(result.geheZuBestellung).toBeDefined();
		expect(result.geheZuBestellung(1)).toBe("/order/1");
	});

	it("with options #2", () => {
		const opts = {
			defaultPath : "Home"
		};
		const result = createRouteFunction(routingImpl, "/", opts );

		expect(result.goToHome).toBeDefined();
		expect(result.goToHome()).toBe("/");
	});

});
