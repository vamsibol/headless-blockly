import * as Blockly from "blockly/core";
const initializeArithmeticGenericBlock = () => {
  Blockly.Blocks["arithmetic_generic"] = {
    init: function () {
      const arithmeticOperators: Blockly.MenuOption[] = [];
      // BlockDefinitionsService.arithmetic_operators
      this.appendValueInput("LHS").setCheck([
        "Static Value",
        "Activity Attribute",
        "Product Attribute",
        "Payment Attribute",
        "Number",
        "Currency Converter",
        "Arithmetic",
        "Blueprint Variable",
      ]);
      this.appendValueInput("RHS")
        .setCheck([
          "Static Value",
          "Activity Attribute",
          "Product Attribute",
          "Payment Attribute",
          "Number",
          "Currency Converter",
          "Arithmetic",
          "Blueprint Variable",
        ])
        .appendField(
          new Blockly.FieldDropdown(arithmeticOperators),
          "operator"
        );
      this.setInputsInline(true);
      this.setOutput(true, "Arithmetic");
      this.setColour("#3ea6cb");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeArithmeticGenericBlock };
