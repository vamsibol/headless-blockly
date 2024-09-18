import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeStaticDateTimeBlock = (
  blocklyDataHelper: BlocklyDataService
) => {
  Blockly.Blocks["static_date_time"] = {
    init: function () {
      const textField = new Blockly.FieldTextInput();
      this.appendDummyInput().appendField(textField, "value");
      this.setInputsInline(true);
      this.setOutput(true, "Static date time");
      this.setColour("#3EA6CB");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeStaticDateTimeBlock };
