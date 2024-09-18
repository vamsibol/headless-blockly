import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeProductAttributeBlock = (
  blocklyDataHelper: BlocklyDataService
) => {
  Blockly.Blocks["product_attribute"] = {
    init: function () {
      const attributes: Blockly.MenuOption[] = [];
      // BlockDefinitionsService.product_and_productoffer_type_attributes
      const dropdown = new Blockly.FieldDropdown(
        attributes
        // function (option) {
        //   this.sourceBlock_.updateShape_(option);
        // }
      );

      this.appendDummyInput()
        .appendField("Product")
        .appendField(dropdown, "ATTRIBUTE_PRODUCTS");
      this.setInputsInline(true);
      this.setOutput(true, "Product Attribute");
      this.setColour("#bbc4c9");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeProductAttributeBlock };
