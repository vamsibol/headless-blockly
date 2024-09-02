import * as Blockly from "blockly/core";
const initializeAirportAttributeBlock = () => {
  Blockly.Blocks["airport_attribute"] = {
    init: function () {
      // var airportpair_attr = BlockDefinitionsService.airport_pair_type;

      const attributes: Blockly.MenuOption[] = [];

      const dropdown = new Blockly.FieldDropdown(
        attributes
        //   function(option) {
        //     this.sourceBlock_.updateShapeByAttribute_("airport_method", option);
        // }
      );
      this.appendDummyInput().appendField("Airport Pair");
      this.appendDummyInput().appendField(dropdown, "airportpair_attribute");
      this.setInputsInline(true);
      this.setOutput(true, "Payment Attribute");
      this.setColour("#bbc4c9");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeAirportAttributeBlock };
