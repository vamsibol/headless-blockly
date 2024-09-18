import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";
const initializeMemberAttributeBlock = (
  blocklyDataHelper: BlocklyDataService
) => {
  Blockly.Blocks["member_attribute"] = {
    init: function () {
      // let options= angular.copy(BlockDefinitionsService.member_attribute_types_read);
      let options: Blockly.MenuOption[] = [];

      // if($scope.blockly_type != 'service_menu_blockly'){
      //     options.push(['Segment-Level', "MP_S"]);
      // }
      options.push(["Tier Level", "MA_T"]);

      const dropdown = new Blockly.FieldDropdown(
        options
        // function(option) {
        //   this.sourceBlock_.updateShape_(option);
        // }
      );

      this.appendDummyInput()
        .appendField("Member")
        .appendField(dropdown, "ATTRIBUTE_TYPE");

      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour("#bbc4c9");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};

export { initializeMemberAttributeBlock };
