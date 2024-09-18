import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";

const initializeIfPaymentAttributeBlock = (
  blocklyDataHelper: BlocklyDataService
) => {
  Blockly.Blocks["if_payment_attribute"] = {
    init: function () {
      //   let paymentMethods = BlockDefinitionsService.getAttributesTuple('payment_method');
      //   paymentMethods.unshift(['--', '']);
      const paymentMethods: any[] = [["--", ""]];
      const dropdown = new Blockly.FieldDropdown(
        paymentMethods
        // (option)=> {
        //   this.sourceBlock_.updateShapeByAttribute_("payment_method", option);
        // }
      );

      this.appendDummyInput()
        .appendField("If Payment")
        .appendField(dropdown, "payment_attribute");
      this.setInputsInline(true);
      this.setPreviousStatement(true, ["If Payment"]);
      this.setNextStatement(true, ["If Payment"]);
      this.setColour("#71d46d");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};
export { initializeIfPaymentAttributeBlock };
