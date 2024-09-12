import * as Blockly from "blockly/core";
import { BlocklyDataHelper } from "../../blockly-helpers";
export const initializeActivityCriteriaBlock = (
  blocklyDataHelper: BlocklyDataHelper
) => {
  Blockly.Blocks["activity_criteria"] = {
    init: function () {
      const filterDropdownValues = new Blockly.FieldDropdown(
        blocklyDataHelper.activity_filter_objects,
        (option) => {
          this.updateShapeByObject_(option);
          return option;
        }
      );

      this.appendDummyInput()
        .appendField("Filter")
        .appendField(filterDropdownValues, "OBJECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, ["Filter", "OR"]);
      this.setNextStatement(true, ["Filter", "OR"]);
      this.setColour("#e75959");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};
