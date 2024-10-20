import express from "express";
import {
    createRule,
    combineExistingRules,
    evaluateRuleAgainstData
} from "../controllers/ruleController.js";

const router = express.Router();

// Route to create a new rule
router.post("/create", createRule);

// Route to combine existing rules
router.post("/combine", combineExistingRules);

// Route to evaluate a rule against user data
router.post("/evaluate", evaluateRuleAgainstData);

export default router;
