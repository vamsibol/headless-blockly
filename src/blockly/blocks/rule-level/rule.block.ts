import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeRuleBlock = (blocklyDataHelper: BlocklyDataService) => {
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
