import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRule from "./components/AddRule";
import CombineRules from "./components/CombineRules";
import EvaluateRule from "./components/EvaluateRule";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    <Route path="/" element={<AddRule />} />
                    <Route path="/combine" element={<CombineRules />} />
                    <Route path="/evaluate" element={<EvaluateRule />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
