/**
 * LIST OF BLOCKS FOR REWARD OFFER
 * Level: OFFER
 *  - offer_generic
 *  - activity
 *  - activity_criteria
 *  - event
 *  - or
 * Level: Rule
 *  - rule
 *  - rule_line
 *  - payment_rule
 *  - if_generic_adaptive
 *  - if_payment_attribute
 *  - action
 *  - action_third_party
 * Level: Attributes & Variables
 *  - static_value
 *  - current_date_block
 *  - static_string_value
 *  - static_date
 *  - static_date_time
 *  - currency_converter
 *  - arithmetic_generic
 *  - arithmetic_date
 *  - activity_attribute
 *  - member_attribute
 *  - product_attribute
 *  - payment_attribute
 *  - airport_attribute
 **/

import * as Blockly from "blockly";
import {
  initializeActionBlock,
  initializeActionThirdPartyBlock,
  initializeActivityAttributeBlock,
  initializeActivityBlock,
  initializeActivityCriteriaBlock,
  initializeAirportAttributeBlock,
  initializeArithmeticDateBlock,
  initializeArithmeticGenericBlock,
  initializeCurrencyConverterBlock,
  initializeCurrentDateBlock,
  initializeEventBlock,
  initializeIfGenericAdaptiveBlock,
  initializeIfPaymentAttributeBlock,
  initializeMemberAttributeBlock,
  initializeOfferGenericBlock,
  initializeORBlock,
  initializePaymentAttributeBlock,
  initializePaymentRuleBlock,
  initializeProductAttributeBlock,
  initializeRuleBlock,
  initializeRuleLineBlock,
  initializeStaticDateBlock,
  initializeStaticDateTimeBlock,
  initializeStaticStringValueBlock,
  initializeStaticValueBlock,
} from "../../blocks";
import { OfferGenericBlockGenerator } from "../../drl-generators/offer-generic.drl";
import { decodeBS64, encodeBS64 } from "../../../helpers";
import { ActivityBlockGenerator } from "../../drl-generators/activity.drl";
import { BlocklyDataService } from "../../blockly-services";
import { ActivityCriteriaBlockGenerator } from "../../drl-generators";

export class RewardOfferBlockly {
  private drlGenerator: Blockly.CodeGenerator;
  private workspace: Blockly.Workspace;
  private readonly REWARD_OFFER_BLOCKS: any = {
    offer_generic: {
      initializer: initializeOfferGenericBlock,
      generator: OfferGenericBlockGenerator,
    },
    activity: {
      initializer: initializeActivityBlock,
      generator: ActivityBlockGenerator,
    },
    activity_criteria: {
      initializer: initializeActivityCriteriaBlock,
      generator: ActivityCriteriaBlockGenerator,
    },
    event: {
      initializer: initializeEventBlock,
      generator: () => {
        return "event";
      },
    },
    or: {
      initializer: initializeORBlock,
      generator: () => {
        return "or";
      },
    },
    rule: {
      initializer: initializeRuleBlock,
      generator: () => () => {
        return "rule";
      },
    },
    rule_line: {
      initializer: initializeRuleLineBlock,
      generator: () => {
        return "rule_line";
      },
    },
    payment_rule: {
      initializer: initializePaymentRuleBlock,
      generator: () => {
        return "payment_rule";
      },
    },
    if_generic_adaptive: {
      initializer: initializeIfGenericAdaptiveBlock,
      generator: () => {
        return "if_generic_adaptive";
      },
    },
    if_payment_attribute: {
      initializer: initializeIfPaymentAttributeBlock,
      generator: () => {
        return "if_payment_attribute";
      },
    },
    action: {
      initializer: initializeActionBlock,
      generator: () => {
        return "action";
      },
    },
    action_third_party: {
      initializer: initializeActionThirdPartyBlock,
      generator: () => {
        return "action_third_party";
      },
    },
    static_value: {
      initializer: initializeStaticValueBlock,
      generator: () => {
        return "static_value";
      },
    },
    current_date_block: {
      initializer: initializeCurrentDateBlock,
      generator: () => {
        return "current_date_block";
      },
    },
    static_string_value: {
      initializer: initializeStaticStringValueBlock,
      generator: () => {
        return "static_string_value";
      },
    },
    static_date: {
      initializer: initializeStaticDateBlock,
      generator: () => {
        return "static_date";
      },
    },
    static_date_time: {
      initializer: initializeStaticDateTimeBlock,
      generator: () => {
        return "static_date_time";
      },
    },
    currency_converter: {
      initializer: initializeCurrencyConverterBlock,
      generator: () => {
        return "currency_converter";
      },
    },
    arithmetic_generic: {
      initializer: initializeArithmeticGenericBlock,
      generator: () => {
        return "arithmetic_generic";
      },
    },
    arithmetic_date: {
      initializer: initializeArithmeticDateBlock,
      generator: () => {
        return "arithmetic_date";
      },
    },
    activity_attribute: {
      initializer: initializeActivityAttributeBlock,
      generator: () => {
        return "activity_attribute";
      },
    },
    member_attribute: {
      initializer: initializeMemberAttributeBlock,
      generator: () => {
        return "member_attribute";
      },
    },
    product_attribute: {
      initializer: initializeProductAttributeBlock,
      generator: () => {
        return "product_attribute";
      },
    },
    payment_attribute: {
      initializer: initializePaymentAttributeBlock,
      generator: () => {
        return "payment_attribute";
      },
    },
    airport_attribute: {
      initializer: initializeAirportAttributeBlock,
      generator: () => {
        return "airport_attribute";
      },
    },
  };
  extraData: any = {};
  constructor(private blocklyDataService: BlocklyDataService, offerData: any) {
    // Create Blockly Workspace
    this.workspace = new Blockly.Workspace();
    this.drlGenerator = new Blockly.Generator("DRL");

    this.drlGenerator.scrub_ = (block, code, thisOnly) => {
      const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
      if (nextBlock && !thisOnly) {
        return code + "\n" + this.drlGenerator.blockToCode(nextBlock);
      }
      return code;
    };

    this.extraData.offer = offerData;
    this.extraData.blocklyDataService = blocklyDataService;
    this.initializeRewardOfferBlocks();
  }

  private initializeRewardOfferBlocks() {
    Object.keys(this.REWARD_OFFER_BLOCKS).forEach((block) => {
      this.REWARD_OFFER_BLOCKS[block].initializer(this.blocklyDataService);
      this.drlGenerator.forBlock[block] = this.REWARD_OFFER_BLOCKS[
        block
      ].generator(this.extraData);
    });
  }

  public getDRL(xml: string): string {
    // Decode XML
    const decodedXML = decodeBS64(xml);

    // Inject XML
    const xmlElement = Blockly.utils.xml.textToDom(decodedXML);
    Blockly.Xml.domToWorkspace(xmlElement, this.workspace);

    // Generate DRL
    const code = this.drlGenerator.workspaceToCode(this.workspace);
    // return encodeBS64(code);
    return code;
  }

  public clearWorkspace() {
    this.workspace.clear();
  }
}
