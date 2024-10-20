import { expect } from 'chai';
import { createRule } from '../../controllers/ruleController.js';

describe('Rule Controller', () => {
  it('should create a valid rule and return an AST', async () => {
    const req = {
      body: {
        ruleString: 'age > 30',
        name: 'Test Rule',
      },
    };
    const res = {
      status: (code) => ({
        json: (data) => ({ code, data }),
      }),
    };
    
    const result = await createRule(req, res);
    expect(result.data.rule).to.have.property('ast');
  });
});
