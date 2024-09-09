import * as Blockly from "blockly";

export const OfferGenericBlockGenerator = (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) => {
  const statements_activities = generator?.statementToCode(block, "activities");
  const statements_events = generator?.statementToCode(block, "events");
  const code = statements_activities + "\n\n" + statements_events;
  return code;
};
