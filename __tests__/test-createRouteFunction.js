import createRouteFunction from '../modules/createRouteFunction';

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

	it("with alias", () => {
		const path = "/order/:id";
		const result = createRouteFunction(routingImpl, path, "Bestellung" );

		expect(result.goToBestellung).toBeDefined();
		expect(result.goToBestellung(1)).toBe("/order/1");
	});

	it("with options #1 (suffix)", () => {
		const path = "/order/:id";
		const opts = {
			suffix: "geheZu"
		};
		const result = createRouteFunction(routingImpl, path, null, opts );

		expect(result.geheZuOrder).toBeDefined();
		expect(result.geheZuOrder(1)).toBe("/order/1");
	});

	it("with options #2 (defaultPath)", () => {
		const opts = {
			defaultPath : "Home"
		};
		const result = createRouteFunction(routingImpl, "/", null, opts );

		expect(result.goToHome).toBeDefined();
		expect(result.goToHome()).toBe("/");
	});

});
