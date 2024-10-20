import React, { useState } from "react";
import { createRule } from "../utils/api";
import { Link } from "react-router-dom";

const AddRule = () => {
  const [name, setName] = useState("");
  const [ruleString, setRuleString] = useState("");
  const [message, setMessage] = useState("");

  // Sample rules to copy
  const sampleRules = [
    "(age > 30 AND department = 'Sales') AND (salary > 50000 OR experience > 5)",
    "((age < 25 AND department = 'Marketing') OR (experience > 3)) AND salary > 40000",
    "(department = 'HR' AND age > 35) OR experience > 7",
  ];

  // Function to handle the API call for creating a rule
  const handleCreateRule = async () => {
    if (!name || !ruleString) {
      setMessage("Both name and rule are required!");
      return;
    }

    try {
      const response = await createRule(name, ruleString);
      setMessage("Rule created successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to copy a rule to the clipboard
  const handleCopyRule = (rule) => {
    navigator.clipboard.writeText(rule);
    setMessage("Rule copied! Paste it into the input box.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Links to other parts of the application */}
      <div className="w-full flex justify-center space-x-10 mb-10 text-2xl p-4">
        <Link to="/combine" className="text-blue-500 font-bold hover:underline">
          Combine Rules
        </Link>
        <Link
          to="/evaluate"
          className="text-blue-500 font-bold hover:underline"
        >
          Evaluate Rule
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-4">Create a New Rule</h2>

      {/* Input box for the rule name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter rule name (e.g., SalesRule)"
        className="w-full max-w-md px-4 py-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Input box for the rule string */}
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule (e.g., age > 30 AND department = 'Sales')"
        className="w-full max-w-md px-4 py-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button to create a new rule */}
      <button
        onClick={handleCreateRule}
        className="w-full max-w-md bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Create Rule
      </button>

      {/* Display success or error message */}
      {message && (
        <p className="mt-4 text-lg font-semibold text-green-600">{message}</p>
      )}

      {/* Section to display sample rules with a copy button */}
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">Sample Rules</h3>
        <ul className="space-y-2">
          {sampleRules.map((rule, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-gray-200 rounded-lg shadow-sm"
            >
              <span>{rule}</span>
              <button
                onClick={() => handleCopyRule(rule)}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddRule;
