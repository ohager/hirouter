import {purgeVariableName, firstLetterUpperCase} from "../modules/utils";

describe("Test utility functions", () => {

	it("purges urls variable test", () => {
		expect(purgeVariableName("var")).toBe("var");
		expect(purgeVariableName(":var")).toBe("var");
		expect(purgeVariableName.bind(null,"")).toThrow();
		expect(purgeVariableName.bind(null, null)).toThrow();
		expect(purgeVariableName.bind(null, undefined)).toThrow();
	});

	it("first letter uppercase test", () => {
		expect(firstLetterUpperCase("")).toBe("");
		expect(firstLetterUpperCase("test")).toBe("Test");
		expect(firstLetterUpperCase("Test")).toBe("Test");
		expect(firstLetterUpperCase("Test")).toBe("Test");

	});

});
