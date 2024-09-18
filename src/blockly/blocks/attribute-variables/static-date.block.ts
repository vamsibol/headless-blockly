import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeStaticDateBlock = (blocklyDataHelper: BlocklyDataService) => {
  Blockly.Blocks["static_date"] = {
    init: function () {
      const textField = new Blockly.FieldTextInput();
      this.appendDummyInput().appendField(textField, "value");
      this.setInputsInline(true);
      this.setOutput(true, "Static date");
      this.setColour("#3EA6CB");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeStaticDateBlock };
