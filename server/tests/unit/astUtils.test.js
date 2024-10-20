import { createAST, combineRules, evaluateRule } from "../../utils/astUtils.js";
import { expect } from "chai";

describe("AST Utils", () => {
    it("should create an AST from a simple rule", () => {
        const rule = "age > 30 AND department = 'Sales'";
        const ast = createAST(rule);

        expect(ast.type).to.equal("operator");
        expect(ast.value).to.equal("AND");
        expect(ast.left.value).to.equal("age > 30");
        expect(ast.right.value).to.equal("department = 'Sales'");
    });

    it("should combine two ASTs with OR", () => {
        const rule1 = "age > 30 AND department = 'Sales'";
        const rule2 = "age < 25 AND department = 'Marketing'";
        
        const ast1 = createAST(rule1);
        const ast2 = createAST(rule2);

        const combinedAST = combineRules([ast1, ast2]);

        expect(combinedAST.type).to.equal("operator");
        expect(combinedAST.value).to.equal("OR");
        expect(combinedAST.left).to.deep.equal(ast1);
        expect(combinedAST.right).to.deep.equal(ast2);
    });

    it("should evaluate an AST against user data", () => {
        const rule = "age > 30 AND department = 'Sales'";
        const ast = createAST(rule);

        const userData = { age: 35, department: "Sales" };
        const result = evaluateRule(ast, userData);

        expect(result).to.be.true;
    });
});
