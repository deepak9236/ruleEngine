import Rule from "../models/Rule.js";
import { createAST, combineRules, evaluateRule } from "../utils/astUtils.js";

// Controller to create a new rule
export const createRule = async (req, res) => {
    try {
        const { name, ruleString } = req.body;
        console.log("Deepak",name, ruleString);
        const ast = createAST(ruleString);

        const newRule = new Rule({
            name,
            ast,
        });

        await newRule.save();
        res.status(201).json({ message: "Rule created successfully", rule: newRule });
    } catch (error) {
        console.error("Error in createRule:", error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};


// Controller to combine existing rules
export const combineExistingRules = async (req, res) => {
    try {
        const { ruleIds } = req.body;
        const rules = await Rule.find({ _id: { $in: ruleIds } });

        const ruleASTs = rules.map(rule => rule.ast);
        const combinedAST = combineRules(ruleASTs);

        res.status(200).json({ message: "Rules combined successfully", ast: combinedAST });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to evaluate rule against data
// Updated controller to evaluate rule against data
export const evaluateRuleAgainstData = async (req, res) => {
    try {
        const { ruleId, userData } = req.body;
        const rule = await Rule.findById(ruleId);

        if (!rule) {
            return res.status(404).json({ message: "Rule not found" });
        }

        if (!rule.ast) {
            return res.status(400).json({ message: "Rule AST is missing" });
        }

        console.log("Rule AST:", JSON.stringify(rule.ast, null, 2));
        console.log("User Data:", JSON.stringify(userData, null, 2));

        const isEligible = evaluateRule(rule.ast, userData);
        res.status(200).json({ message: "Rule evaluated successfully", isEligible });
    } catch (error) {
        console.error("Error in evaluateRuleAgainstData:", error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};