import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";

const initializeActivityBlock = (blocklyDataHelper: BlocklyDataService) => {
  Blockly.Blocks["activity"] = {
    init: function () {
      this.appendDummyInput().appendField("On Activity");
      this.appendStatementInput("ACTIVITY_CRITERIA")
        .setCheck(["Filter", "OR"])
        .appendField("F");
      this.appendStatementInput("RULES").setCheck("Rule").appendField("R");
      this.setInputsInline(true);
      this.setPreviousStatement(true, "Activity");
      this.setNextStatement(true, "Activity");
      this.setColour("#405f97");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeActivityBlock };
