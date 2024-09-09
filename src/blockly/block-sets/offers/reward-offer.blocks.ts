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
import { initializeOfferGenericBlock } from "../../blocks";
import { OfferGenericBlockGenerator } from "../../drl-generators/offer-generic.drl";

export class RewardOfferBlocks {
  drlGenerator: Blockly.CodeGenerator;
  readonly REWARD_OFFER_BLOCKS: any = {
    offer_generic: {
      initializer: initializeOfferGenericBlock,
      generator: OfferGenericBlockGenerator,
    },
  };
  constructor() {
    this.drlGenerator = new Blockly.Generator("DRL");
    this.initializeRewardOfferBlocks();
  }

  initializeRewardOfferBlocks() {
    Object.keys(this.REWARD_OFFER_BLOCKS).forEach((block) => {
      this.REWARD_OFFER_BLOCKS[block].initializer();
      this.drlGenerator.forBlock[block] =
        this.REWARD_OFFER_BLOCKS[block].generator;
    });
  }
}
