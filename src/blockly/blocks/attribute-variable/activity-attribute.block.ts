import * as Blockly from "blockly/core";
const initializeActivityBlock = () => {
  Blockly.Blocks["activity_attribute"] = {
    init: function () {
      // var attributes = BlockDefinitionsService.getAttributesTuple("activity");
      // attributes.unshift(["--", ""]);

      const attributes: Blockly.MenuOption[] = [];
      attributes.unshift(["--", ""]);

      const dropdown = new Blockly.FieldDropdown(
        attributes
        // function (option) {
        //   this.sourceBlock_.updateShape_(option);
        // }
      );

      this.appendDummyInput().appendField("BIT");
      this.appendDummyInput().appendField(dropdown, "ATTRIBUTE");
      this.setInputsInline(true);
      this.setOutput(true, "Activity Attribute");
      this.setColour("#bbc4c9");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeActivityBlock };
