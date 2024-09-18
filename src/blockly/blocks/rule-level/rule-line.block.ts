import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";

const initializeRuleLineBlock = (blocklyDataHelper: BlocklyDataService) => {
  Blockly.Blocks["rule_line"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Line Rule")
        .appendField(new Blockly.FieldTextInput("tag"), "IDENTIFIER");

      this.appendStatementInput("CONDITION")
        .setCheck(["If", "OR"])
        .appendField("C");
      this.appendStatementInput("ACTION").setCheck("Action").appendField("A");
      this.setPreviousStatement(true, ["Rule", "Action"]);
      this.setNextStatement(true, ["Rule", "Action"]);
      this.setColour("#fe97a8");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeRuleLineBlock };
