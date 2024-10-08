import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";

const initializeEventBlock = (blocklyDataHelper: BlocklyDataService) => {
  Blockly.Blocks["event"] = {
    init: function () {
      this.appendDummyInput().appendField("On Event");
      this.appendStatementInput("RULES").setCheck("Rule").appendField("Rules");
      this.setInputsInline(true);
      this.setPreviousStatement(true, "Event");
      this.setNextStatement(true, "Event");
      this.setColour("#59ae00");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeEventBlock };
