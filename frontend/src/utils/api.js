import axios from 'axios';

const API_URL = "https://ruleengineapi-4hvj.onrender.com"; // Your backend URL

// API call to create a new rule
export const createRule = async (name, ruleString) => {
    try {
        console.log(name,ruleString);
        const response = await axios.post(`${API_URL}/api/rules/create`, { name, ruleString });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// API call to combine rules
export const combineRules = async (ruleIds) => {
    try {
        const response = await axios.post(`${API_URL}/api/rules/combine`, { ruleIds });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// API call to evaluate a rule
export const evaluateRule = async (ruleId, userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/rules/evaluate`, { ruleId, userData });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
