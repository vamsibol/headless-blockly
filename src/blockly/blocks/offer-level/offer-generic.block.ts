import * as Blockly from "blockly";

const initializeOfferGenericBlock = () => {
  Blockly.Blocks["offer_generic"] = {
    init: function () {
      this.appendDummyInput().appendField("Offer");
      this.appendStatementInput("activities")
        .setCheck("Activity")
        .appendField("A");
      this.appendStatementInput("events").setCheck("Event").appendField("E");
      this.setInputsInline(false);
      this.setColour("#2c3241");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeOfferGenericBlock };
