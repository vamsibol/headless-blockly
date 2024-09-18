import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeCurrentDateBlock = (  blocklyDataHelper: BlocklyDataService) => {
  Blockly.Blocks["current_date_block"] = {
    init: function () {
      // var dropdown = new Blockly.FieldDropdown(BlockDefinitionsService.datetime_operators, function(option) {
      //     this.sourceBlock_.updateShape_(option);
      // });

      const operators: Blockly.MenuOption[] = [];
      this.appendDummyInput()
        .appendField("Current Date")
        .appendField(operators, "current_date_type");
      this.setInputsInline(true);
      this.setOutput(true, "Current Date");
      this.setColour("#3EA6CB");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeCurrentDateBlock };
