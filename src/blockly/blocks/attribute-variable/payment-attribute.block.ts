import * as Blockly from "blockly/core";
const initializePaymentAttributeBlock = () => {
  Blockly.Blocks["payment_attribute"] = {
    init: function () {
      // var payment_attr = BlockDefinitionsService.getAttributesTuple('payment_method');
      const attributes: Blockly.MenuOption[] = [];
      attributes.unshift(["--", ""]);
      const dropdown = new Blockly.FieldDropdown(
        attributes
        // function(option) {
        //   this.sourceBlock_.updateShapeByAttribute_("payment_method", option);
        // }
      );
      this.appendDummyInput().appendField("Payment");
      this.appendDummyInput().appendField(dropdown, "payment_attribute");
      this.setInputsInline(true);
      this.setOutput(true, "Payment Attribute");
      this.setColour("#bbc4c9");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializePaymentAttributeBlock };
