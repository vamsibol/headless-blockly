import * as Blockly from "blockly/core";
const initializeStaticValueBlock = () => {
  Blockly.Blocks["static_value"] = {
    init: function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldTextInput("Static Value"),
        "value"
      );
      this.setInputsInline(true);
      this.setOutput(true, "Static Value");
      this.setColour("#3ea6cb");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeStaticValueBlock };
