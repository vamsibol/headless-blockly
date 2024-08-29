import * as Blockly from "blockly/core";
const initializeActivityCriteriaBlock = () => {
  Blockly.Blocks["activity_criteria"] = {
    init: function () {
      // var lhs_dropdown = new Blockly.FieldDropdown(BlockDefinitionsService.activity_filter_objects, function(option) {
      //     this.sourceBlock_.updateShapeByObject_(option);
      // });

      let filterDropdownValues: any[] = [];

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

export { initializeActivityCriteriaBlock };
