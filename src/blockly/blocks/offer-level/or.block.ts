import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeORBlock = (blocklyDataHelper: BlocklyDataService) => {
  Blockly.Blocks["or"] = {
    init: function () {
      this.appendDummyInput().appendField("OR");
      this.appendStatementInput("OPERAND1")
        .setCheck(["If", "Filter", "OR"])
        .appendField(" ");
      this.appendStatementInput("OPERAND2")
        .setCheck(["If", "Filter", "OR"])
        .appendField(" ");
      this.setPreviousStatement(true, ["OR", "If"]);
      this.setNextStatement(true, ["OR", "If"]);
      this.setColour("#9E2B56");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeORBlock };
