import * as Blockly from "blockly/core";
import { BlocklyDataService } from "../../blockly-services";

export const initializeActivityCriteriaBlock = (
  blocklyDataHelper: BlocklyDataService
) => {
  Blockly.Blocks["activity_criteria"] = {
    init: function () {
      const filterDropdownValues = new Blockly.FieldDropdown(
        blocklyDataHelper.activity_filter_objects,
        (option) => {
          this.updateShapeByAttributeType(option);
          return option;
        }
      );
      this.appendDummyInput()
        .appendField("Filter")
        .appendField(filterDropdownValues, "OBJECT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, ["Filter", "OR"]);
      this.setNextStatement(true, ["Filter", "OR"]);
      this.setColour("#e75959");
      this.setTooltip("");
      this.setHelpUrl("");
    },

    updateShapeByAttributeType: function (atrributeType: string) {
      const FIELD_NAMES = [
        "ATTRIBUTE_TYPE_INPUT",
        "ATTRIBUTE_INPUT",
        "FACEBOOK_PAGE",
        "RHS_INPUT",
        "RHS_VALUE",
        "OPERATOR_INPUT",
        "vector_counter_namespace",
        "PRODUCT_INPUT",
        "payment_method",
        "PAYMENT_RHS_INPUT",
        "PAYMENT_RHS_VALUE",
        "PAYMENT_OPERATOR_INPUT",
        "NO_TARGET",
        "TEXT_VALUE",
        "vector_counter",
        "vector_counter_value",
        "vector_attr_level",
        "vector_index_datatype",
        "mto_target_type",
        "dummy_date",
        "mto_ladder_value",
        "blueprinttypes",
        "TIER_LEVEL_INPUT",
        "TIER_NAMES_INPUT",
        "TIER_DEFAULT_INPUT",
        "TIER_OPERATOR_INPUT_LOYALTY",
        "TIER_OPERATOR_INPUT",
        "TIER_OPERATOR_INPUT_VALUE",
        "RHS_PURCHASED_TVALUE",
      ];
      FIELD_NAMES.forEach((field) => {
        if (this.getInput(field)) this.removeInput(field);
      });

      if (atrributeType.length > 0) {
        let fieldOptions: Blockly.MenuOption[] = [["--", ""]];
        let fieldName: string = "ATTRIBUTE_INPUT";
        switch (atrributeType) {
          case "activity":
            fieldOptions = [...fieldOptions, ...[]];
            break;
          case "airport":
            fieldOptions = [...fieldOptions, ...[]];
            break;
          case "location":
            fieldOptions = [...fieldOptions, ...[]];
            break;
          case "member":
            fieldOptions = [...fieldOptions, ...[]];
            break;
          case "sponsor":
            fieldOptions = [...fieldOptions, ...[]];
            break;
        }

        const sponsorAttributeDropdown = new Blockly.FieldDropdown(
          fieldOptions,
          (option: string) => {
            this.updateShapeByAttribute(atrributeType, option);
            return option;
          }
        );
        this.appendDummyInput(fieldName).appendField(
          sponsorAttributeDropdown,
          "attribute"
        );
      }
    },
    updateShapeByAttribute: function (
      attributeType: string,
      attribute: string
    ) {},
  };
};
