import React, { useState } from "react";
import { evaluateRule } from "../utils/api";
import { Link } from "react-router-dom";

const EvaluateRule = () => {
  const [ruleId, setRuleId] = useState("");
  const [userData, setUserData] = useState("{}");
  const [isEligible, setIsEligible] = useState(null);
  const [message, setMessage] = useState("");

  // Sample rule ID and user data for copying
  const sampleRuleId = "6715114de976982d0c183caa";
  const sampleUserData = {
    age: 35,
    department: "Sales",
    salary: 60000,
    experience: 7,
  };

  const handleEvaluateRule = async () => {
    try {
      const data = JSON.parse(userData);
      const response = await evaluateRule(ruleId, data);
      setIsEligible(response.isEligible);
      setMessage("Rule evaluated successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to copy the predefined rule ID and user data to the clipboard
  const handleCopyRuleAndUserData = () => {
    const jsonData = JSON.stringify(sampleUserData, null, 2);
    navigator.clipboard.writeText(
      JSON.stringify(
        { ruleId: sampleRuleId, userData: sampleUserData },
        null,
        2
      )
    );
    setUserData(jsonData); // Automatically populate the input box with user data
    setRuleId(sampleRuleId); // Automatically populate the input box with rule ID
    setMessage(
      "Rule ID and user data copied! Paste them into the input boxes."
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full flex justify-center space-x-10 mb-10 text-2xl p-4">
        <Link to="/" className="text-blue-500 font-bold hover:underline">
          Add Rule
        </Link>
        <Link to="/combine" className="text-blue-500 font-bold hover:underline">
          Combine Rules
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-4">Evaluate Rule</h2>

      {/* Input box for rule ID */}
      <input
        type="text"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
        placeholder="Enter rule ID"
        className="w-full max-w-md px-4 py-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Textarea for user data */}
      <textarea
        value={userData}
        onChange={(e) => setUserData(e.target.value)}
        placeholder='Enter user data as JSON (e.g., {"age": 35, "department": "Sales"})'
        className="w-full max-w-md px-4 py-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
      />

      {/* Button to evaluate the rule */}
      <button
        onClick={handleEvaluateRule}
        className="w-full max-w-md bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Evaluate Rule
      </button>

      {/* Display success or error message */}
      {message && (
        <p className="mt-4 text-lg font-semibold text-green-600">{message}</p>
      )}

      {/* Display eligibility result */}
      {isEligible !== null && (
        <p className="mt-4 text-lg">
          User is {isEligible ? "eligible" : "not eligible"} based on the rule.
        </p>
      )}

      {/* Section to copy predefined rule ID and user data */}
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">
          Sample Rule and User Data
        </h3>
        <pre className="bg-gray-200 p-4 rounded-lg mb-2">
          {JSON.stringify(
            { ruleId: sampleRuleId, userData: sampleUserData },
            null,
            2
          )}
        </pre>
        <button
          onClick={handleCopyRuleAndUserData}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Copy Sample Rule ID and User Data
        </button>
      </div>

      {/* Navigation links */}
      <div className="mt-6 space-x-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Add Rule
        </Link>
        <Link to="/combine" className="text-blue-500 hover:underline">
          Combine Rules
        </Link>
      </div>
    </div>
  );
};

export default EvaluateRule;