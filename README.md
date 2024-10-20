# Rule Engine with AST

**Live Demo:** ![View Live Demo]([https://your-rule-engine-demo-url.com](https://amazing-kringle-caf0aa.netlify.app/))

## Overview

The Rule Engine with Abstract Syntax Tree (AST) is a 3-tier application designed to determine user eligibility based on various attributes, including age, department, income, and experience. This project utilizes Node.js for the backend, React for the frontend, and MongoDB for data storage, showcasing a complete tech stack.

## Technical Stack

- **Frontend:** React
- **Backend:** Node.js
- **Database:** MongoDB
- **Data Structure:** Abstract Syntax Tree (AST)

## Key Features

- **Dynamic Rule Creation:** Users can create conditional rules using a string format, which the application translates into an AST representation.
- **Rule Combination:** Efficiently combines multiple rules into a single AST to optimize evaluations.
- **Evaluation Logic:** The engine evaluates user attributes against defined rules, returning eligibility results.

## Data Structure

The AST is represented by a Node structure with the following fields:

- **type:** String indicating the node type ("operator" for AND/OR, "operand" for conditions).
- **left:** Reference to the left child Node.
- **right:** Reference to the right child Node (for operators).
- **value:** Optional value for operand nodes (e.g., number for comparisons).

## API Endpoints

1. **Create Rule**
   - **Endpoint:** `POST /api/rules/create`
   - **Description:** Creates a new rule from a provided string and returns the corresponding AST.
   - **Example Request:**
     ```json
     {
       "name": "Rule1",
       "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
     }
     ```

2. **Combine Rules**
   - **Endpoint:** `POST /api/rules/combine`
   - **Description:** Combines multiple rules into a single AST.
   - **Example Request:**
     ```json
     {
       "ruleIds": ["67111d0c0d54488b5ed06728", "6711201f0d54488b5ed0672d"]
     }
     ```

3. **Evaluate Rule**
   - **Endpoint:** `POST /api/rules/evaluate`
   - **Description:** Evaluates the combined rule against provided user data.
   - **Example Request:**
     ```json
     {
       "ruleId": "67112e62ffc3e79776d10ded",
       "userData": {
         "age": 35,
         "department": "Sales",
         "salary": 60000,
         "experience": 7
       }
     }
     ```

## Postman Testing

A Postman collection is included to test the API endpoints effectively. This collection demonstrates the usage of each endpoint, ensuring the functionalities are easily verifiable.

## Bonus Features

- Error handling for invalid rule strings or data formats.
- Validation checks for user attributes.
- Modification capabilities for existing rules within the AST.

## Conclusion

This project illustrates a robust rule engine framework using modern web technologies, providing significant flexibility for future enhancements and user-defined functions.

