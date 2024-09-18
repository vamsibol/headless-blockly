import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeArithmeticDateBlock = (
  blocklyDataHelper: BlocklyDataService
) => {
  Blockly.Blocks["arithmetic_date"] = {
    init: function () {
      const operators: Blockly.MenuOption[] = [];
      // BlockDefinitionsService.date_arithmetic_operators,

      const date_arithmetic_operators = new Blockly.FieldDropdown(operators);
      this.appendValueInput("LHS").setCheck([
        "Activity Attribute",
        "Current Date",
        "Product Attribute",
        "Payment Attribute",
        "Number",
        "Static date",
        "Static date time",
        "Static String Value",
        "Arithmetic date",
        "Blueprint Variable",
      ]);
      this.appendDummyInput("optdrodown").appendField(
        date_arithmetic_operators,
        "operator"
      );

      this.shapearithemetic_date(this.getFieldValue("operator"));
    },
  };
};

export { initializeArithmeticDateBlock };
