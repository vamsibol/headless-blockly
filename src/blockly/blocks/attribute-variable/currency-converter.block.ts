import * as Blockly from "blockly/core";
const initializeCurrencyConverterBlock = () => {
  Blockly.Blocks["currency_converter"] = {
    init: function () {
      //   var dropdown = new Blockly.FieldDropdown(BlockDefinitionsService.currency_converter_attributes_read, function(option) {
      //     this.sourceBlock_.updateCurrencyBlockShape_(option);
      // });

      const operators: Blockly.MenuOption[] = [];
      this.appendDummyInput().appendField(operators, "conversion_type");
      this.setInputsInline(true);
      this.setOutput(true, "Currency Converter");
      this.setColour("#3ea6cb");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeCurrencyConverterBlock };
