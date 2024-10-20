import React, { useState } from "react";
import { combineRules } from "../utils/api";
import { Link } from "react-router-dom";

const CombineRules = () => {
  const [ruleIds, setRuleIds] = useState("");
  const [combinedAST, setCombinedAST] = useState(null);
  const [message, setMessage] = useState("");

  // Sample list of rule IDs for demonstration purposes
  const availableRules = [
    { id: "6715114de976982d0c183caa", name: "Sales Rule" },
    { id: "67151192e976982d0c183cad", name: "Marketing Rule" },
    { id: "671511a1e976982d0c183cb0", name: "HR Rule" },
  ];

  // Function to handle the rule combination API call
  const handleCombineRules = async () => {
    try {
      const ids = ruleIds.split(",").map((id) => id.trim());
      const response = await combineRules(ids);
      setCombinedAST(response.ast);
      setMessage("Rules combined successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to copy two rule IDs with a comma
  const handleCopyRuleIds = (id1, id2) => {
    const idsToCopy = `${id1}, ${id2}`;
    navigator.clipboard.writeText(idsToCopy);
    setMessage("Rule IDs copied! Paste them into the input box.");
    setRuleIds(idsToCopy); // Automatically populate the input box
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Navigation links */}
      <div className="w-full flex justify-center space-x-10 mb-10 text-2xl p-4">
        <Link to="/" className="text-blue-500 font-bold hover:underline">
          Add Rule
        </Link>
        <Link
          to="/evaluate"
          className="text-blue-500 font-bold hover:underline"
        >
          Evaluate Rule
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-4">Combine Rules</h2>

      {/* Input box for rule IDs */}
      <input
        type="text"
        value={ruleIds}
        onChange={(e) => setRuleIds(e.target.value)}
        placeholder="Enter rule IDs separated by commas"
        className="w-full max-w-lg px-4 py-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button to combine rules */}
      <button
        onClick={handleCombineRules}
        className="w-full max-w-lg bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Combine Rules
      </button>

      {/* Display success or error message */}
      {message && (
        <p className="mt-4 text-lg font-semibold text-green-600">{message}</p>
      )}

      {/* Display combined AST if available */}
      {combinedAST && (
        <pre className="w-full max-w-lg mt-6 bg-gray-200 p-4 rounded-lg overflow-auto">
          {JSON.stringify(combinedAST, null, 2)}
        </pre>
      )}

      {/* Section to display available rules with copy button */}
      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-2">Available Rules</h3>
        <ul className="space-y-2">
          {availableRules.map((rule, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-200 rounded-lg shadow-sm text-sm break-all"
            >
              <span>
                {rule.name} (ID: {rule.id})
              </span>
              {index < availableRules.length - 1 && (
                <button
                  onClick={() =>
                    handleCopyRuleIds(
                      availableRules[index].id,
                      availableRules[index + 1].id
                    )
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                  Copy {rule.id} and {availableRules[index + 1].id}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CombineRules;
