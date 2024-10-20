import mongoose from 'mongoose';

const NodeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  left: {
    type: mongoose.Schema.Types.Mixed,
  },
  right: {
    type: mongoose.Schema.Types.Mixed,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const RuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ast: {
    type: NodeSchema,
    required: true,
  },
});

const Rule = mongoose.model('Rule', RuleSchema);

export default Rule;
