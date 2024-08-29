import * as Blockly from "blockly/core";

const initializeActionThirdPartyBlock = (offerType: string) => {
  Blockly.Blocks["action_third_party"] = {
    init: function () {
        // const options:any[]=BlockDefinitionsService.third_parties
        const options:any[] = [];
        const third_parties_dropdown = new Blockly.FieldDropdown(options
        //     , function(option) {
        //     this.sourceBlock_.updateShapeByThirdParty(option);
        // }
    );

        this.appendDummyInput()
            .appendField("3rd Party")
            .appendField(third_parties_dropdown, "third_parties_dropdown");

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Action");
        this.setNextStatement(true, "Action");
        this.setColour('#33b8ca');
        this.setTooltip('');
        this.setHelpUrl('');
    },
  };
};

export { initializeActionThirdPartyBlock };
