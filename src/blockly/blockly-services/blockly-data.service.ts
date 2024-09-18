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
  private blocklyHTTPHelper: BlocklyHttpService;
  constructor() {
    this.blocklyHTTPHelper = new BlocklyHttpService();
  }

  initialize() {}
}
