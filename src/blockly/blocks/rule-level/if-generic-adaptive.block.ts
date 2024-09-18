import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";

const initializeIfGenericAdaptiveBlock = (
  blocklyDataHelper: BlocklyDataService
) => {
  Blockly.Blocks["if_generic_adaptive"] = {
    init: function () {
      // if(angular.isDefined($scope.tierClassData)){
      //     if($scope.tierClassData.tier_class_name !== undefined && $scope.tierClassData.tier_class_code !== undefined){
      //         var object_dropdown = new Blockly.FieldDropdown(BlockDefinitionsService.tier_object_blocks, function(option) {
      //             this.sourceBlock_.updateShapeByObject_(option);
      //         });
      //     }
      //     }
      //     else{
      //         var object_dropdown = new Blockly.FieldDropdown(BlockDefinitionsService.object_blocks, function(option) {
      //             this.sourceBlock_.updateShapeByObject_(option);
      //         });
      //     }

      const dropdownData: any[] = [];
      this.appendDummyInput()
        .appendField("If")
        .appendField(dropdownData, "OBJECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, ["If", "Filter"]);
      this.setNextStatement(true, ["If", "Filter"]);
      this.setColour("#e75959");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};
export { initializeIfGenericAdaptiveBlock };
