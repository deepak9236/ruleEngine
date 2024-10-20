export function createAST(ruleString) {
    const tokens = tokenize(ruleString);
    return parse(tokens);
}

function tokenize(ruleString) {
    return ruleString.match(/\(|\)|AND|OR|>=|<=|>|<|=|[^()\s]+/g);
}

function parse(tokens) {
    const operators = ["AND", "OR"];
    const comparators = [">", "<", "=", ">=", "<="];
    const stack = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === "(") {
            let count = 1;
            let j = i + 1;
            while (count > 0 && j < tokens.length) {
                if (tokens[j] === "(") count++;
                if (tokens[j] === ")") count--;
                j++;
            }
            const subExpr = parse(tokens.slice(i + 1, j - 1));
            stack.push(subExpr);
            i = j - 1;
        } else if (operators.includes(token)) {
            const right = stack.pop();
            const left = stack.pop();
            stack.push({
                type: "operator",
                value: token,
                left: left || { type: "operand", value: "undefined" },
                right: right || { type: "operand", value: "undefined" }
            });
        } else if (comparators.includes(token)) {
            const right = tokens[i + 1];
            const left = stack.pop();
            stack.push({
                type: "operator",
                value: token,
                left: left || { type: "operand", value: "undefined" },
                right: { type: "operand", value: right }
            });
            i++;
        } else {
            stack.push({ type: "operand", value: token });
        }
    }

    return stack[0] || { type: "operand", value: "undefined" };
}

// Function to combine two or more ASTs
export function combineRules(rules) {
    // Assuming combining rules with OR for simplicity
    let combinedAST = null;
    rules.forEach(ruleAST => {
        if (combinedAST === null) {
            combinedAST = ruleAST;
        } else {
            combinedAST = {
                type: "operator",
                value: "OR",
                left: combinedAST,
                right: ruleAST,
            };
        }
    });
    return combinedAST;
}

export function evaluateRule(ast, data) {
    if (!ast || typeof ast !== 'object') {
        throw new Error(`Invalid AST: ${JSON.stringify(ast)}`);
    }

    if (ast.type === "operand") {
        return ast.value;
    } else if (ast.type === "operator") {
        if (!ast.left || !ast.right) {
            throw new Error(`Invalid operator node: missing left or right child. Node: ${JSON.stringify(ast)}`);
        }

        switch (ast.value) {
            case "AND":
                return evaluateRule(ast.left, data) && evaluateRule(ast.right, data);
            case "OR":
                return evaluateRule(ast.left, data) || evaluateRule(ast.right, data);
            case ">":
            case "<":
            case "=":
            case ">=":
            case "<=":
                const left = ast.left.type === "operand" ? data[ast.left.value] : evaluateRule(ast.left, data);
                const right = ast.right.type === "operand" ? Number(ast.right.value) : evaluateRule(ast.right, data);
                
                if (left === undefined) {
                    throw new Error(`Field "${ast.left.value}" not found in user data`);
                }
                
                switch (ast.value) {
                    case ">": return left > right;
                    case "<": return left < right;
                    case "=": return left == right;
                    case ">=": return left >= right;
                    case "<=": return left <= right;
                }
            default:
                throw new Error(`Unsupported operator: ${ast.value}`);
        }
    }

    throw new Error(`Invalid node type: ${ast.type}`);
}