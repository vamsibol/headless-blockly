import * as Blockly from "blockly/core";
const initializeRuleBlock = () => {
  Blockly.Blocks["rule"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Rule")
        .appendField(new Blockly.FieldTextInput("tag"), "IDENTIFIER");

      this.appendStatementInput("CONDITION")
        .setCheck(["If", "OR"])
        .appendField("C");
      this.appendStatementInput("ACTION")
        .setCheck(["Action", "Rule"])
        .appendField("A");
      this.setPreviousStatement(true, ["Rule", "Action"]);
      this.setNextStatement(true, ["Rule", "Action"]);
      this.setColour("#8a69c8");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeRuleBlock };
