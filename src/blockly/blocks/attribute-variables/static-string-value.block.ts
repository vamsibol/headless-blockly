import * as Blockly from "blockly/core";
const initializeStaticStringValueBlock = () => {
  Blockly.Blocks["static_string_value"] = {
    init: function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldTextInput("String Value"),
        "value"
      );
      this.setInputsInline(true);
      this.setOutput(true, "Static String Value");
      this.setColour("#3ea6cb");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeStaticStringValueBlock };
