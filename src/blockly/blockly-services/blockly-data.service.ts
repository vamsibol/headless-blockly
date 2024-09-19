import * as Blockly from "blockly";
import { BlocklyHttpService } from ".";

export class BlocklyDataService {
  activity_filter_objects: Blockly.MenuOption[] = [
    ["--", ""],
    ["Airport", "airport"],
    ["BIT", "activity"],
    ["Location", "location"],
    ["Member", "member"],
    ["Sponsor", "sponsor"],
  ];

  // Operator Options
  textTypeOperators: Blockly.MenuOption[] = [
    ["select an option", ""],
    ["=", "=="],
    ["!=", "!="],
    ["is null", "null"],
    ["is not-null", "not_null"],
    ["in", "in"],
    ["not in", "not_in"],
    ["contains", "contains"],
    ["does not contain", "not_contains"],
    ["starts with", "starts_with"],
    ["ends with", "ends_with"],
  ];

  // { sponsor: any }
  customAttributeStore: any = { sponsor: {} };

  // Custom attributes Menu Options
  sponsorAttributes: Blockly.MenuOption[] = [];

  constructor(private blocklyHTTPHelper: BlocklyHttpService) {}

  async initialize() {
    await this.fetchCustomAttributes();
  }

  async fetchCustomAttributes() {
    await this.fetchSponsorCustomAttributes();
  }

  async fetchSponsorCustomAttributes() {
    try {
      const { data } = await this.blocklyHTTPHelper.fetchSponsorAttributes();
      const mapper = this.mapCustomAttributes(data);
      this.sponsorAttributes = mapper.options;
      this.customAttributeStore.sponsor = mapper.dataMap;
    } catch (error) {
      console.error("Error fetching sponsor custom attributes ", error);
    }
  }

  mapCustomAttributes(attributeData: any[]): {
    options: Blockly.MenuOption[];
    dataMap: any;
  } {
    const options: Blockly.MenuOption[] = attributeData.map(
      (attribute: any) => [attribute.visible_name, attribute.name]
    );
    const dataMap = attributeData.reduce((acc: any, attribute: any) => {
      acc[attribute.name] = attribute;
      return acc;
    }, {});
    return { options, dataMap };
  }
}
