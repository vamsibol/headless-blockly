import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";

const initializePaymentRuleBlock = (blocklyDataHelper: BlocklyDataService) => {
  Blockly.Blocks["payment_rule"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Payment Rule")
        .appendField(new Blockly.FieldTextInput("tag"), "IDENTIFIER");

      this.appendStatementInput("CONDITION")
        .setCheck(["If Payment"])
        .appendField("C");
      this.appendStatementInput("ACTION").setCheck(["Action"]).appendField("A");
      this.setPreviousStatement(true, ["Rule", "Action"]);
      this.setNextStatement(true, ["Rule", "Action"]);
      this.setColour("#2fc5a8");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};
export { initializePaymentRuleBlock };
