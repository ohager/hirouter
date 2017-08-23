import analyzePath from '../modules/analyzePath';

describe("nice name from path function", () => {

	it("creates empty name", () => {
		const path = "";
		const result = analyzePath(path);

		expect(result.joinedTokens).toBe("");
		expect(result.variables).toEqual([]);
	});

	it("creates simple name", () => {
		const path = "product";
		const result = analyzePath(path);

		expect(result.joinedTokens).toBe("Product");
		expect(result.variables).toEqual([]);

	});

	it("creates complex name", () => {
		const path = "lab/order";
		const result = analyzePath(path);

		expect(result.joinedTokens).toBe("LabOrder");
		expect(result.variables).toEqual([]);

	});

	it("creates complex name considering variables #1", () => {
		const path = "lab/order/:id";
		const result = analyzePath(path);

		expect(result.joinedTokens).toBe("LabOrder");
		expect(result.variables).toEqual(["id"]);

	});

	it("creates complex name considering variables #2", () => {
		const path = "lab/order/:id/test/:testId/details";
		const result = analyzePath(path);

		expect(result.joinedTokens).toBe("LabOrderTestDetails");
		expect(result.variables).toEqual(["id","testId"]);

	});

	it("creates name considering optional variables", () => {
		const path = "lab/order/(:id)/test/:testId/details";
		const result = analyzePath(path);

		expect(result.joinedTokens).toBe("LabOrderTestDetails");
		expect(result.variables).toEqual(["id","testId"]);

	});

	it("throws exception on invalid variable", () => {
		const path = "lab/order/:/test/:testId/details";
		expect(analyzePath.bind(null,path)).toThrow();
	});

});
