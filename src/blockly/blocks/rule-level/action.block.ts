import * as Blockly from "blockly/core";

const initializeActionBlock = (offerType: string) => {
  Blockly.Blocks["action"] = {
    init: function () {
      let PROPERTIES: any[] = [
        ["--", "--"],
        ["Assign Privilege", "give_privilege"],
        ["Enroll Member", "enrol"],
        ["Expire Points", "expire_points"],
        ["Redeem Points", "take_points"],
        ["Reward Points", "give_points"],
        ["Update Attribute", "update_attribute"],
      ];
      //   if (angular.isDefined($scope.tierClassData)) {
      //     var PROPERTIES = [
      //       ["--", "--"],
      //       ["Assign Tier", "assign_tier"],
      //       ["Redeem Points", "take_points"],
      //       ["Reset Points", "reset_points"],
      //       ["Reward Points", "give_points"],
      //       ["Update Attribute", "update_attribute"],
      //     ];
      //   }

      switch (offerType) {
        case "reward":
          PROPERTIES = [
            ["--", "--"],
            ["Assign Privilege", "give_privilege"],
            ["Expire Points", "expire_points"],
            ["Redeem Points", "take_points"],
            ["Reset Points", "reset_points"],
            ["Return Points", "return_points"],
            ["Reward Points", "give_points"],
            ["Update Attribute", "update_attribute"],
          ];
          break;

        case "award":
          PROPERTIES = [
            ["--", "--"],
            ["Award Product", "give_privilege"],
            ["Redeem Points", "take_points"],
          ];
          break;

        case "enrollment":
          PROPERTIES = [
            ["--", "--"],
            ["Assign Privilege", "give_privilege"],
            ["Enroll Member", "enrol"],
            ["Redeem Points", "take_points"],
            ["Reward Points", "give_points"],
            ["Update Attribute", "update_attribute"],
          ];
          break;

        case "privilege":
          PROPERTIES = [
            ["--", "--"],
            ["Assign Privilege", "give_privilege"],
            ["Reward Points", "give_points"],
            ["Update Attribute", "update_attribute"],
          ];
          break;
        default:
          break;
      }

      //   if ($scope.blockly_type == "service_menu_blockly") {
      //     PROPERTIES = [
      //       ["--", "--"],
      //       ["Assign Privilege", "give_privilege"],
      //       ["Extend Privilege", "extend_privilege"],
      //       ["Redeem Points", "take_points"],
      //       ["Redeem Privilege", "redeem_privilege"],
      //       ["Reinstate Privilege", "reinstate_privilege"],
      //       ["Reset Points", "reset_points"],
      //       ["Reward Points", "give_points"],
      //       ["Transfer Points", "transfer_points"],
      //       ["Transfer Privilege", "transfer_privilege"],
      //       ["Update Attribute", "update_attribute"],
      //     ];
      //   }

      const dropdown = new Blockly.FieldDropdown(
        PROPERTIES
        //     function (option) {
        //     this.sourceBlock_.updateShape_(option);
        //   }
      );

      this.appendDummyInput()
        .appendField("Action")
        .appendField(dropdown, "action_type");
      this.setInputsInline(true);
      this.setPreviousStatement(true, "Action");
      this.setNextStatement(true, "Action");
      this.setColour("#33b8ca");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
};
export { initializeActionBlock };
