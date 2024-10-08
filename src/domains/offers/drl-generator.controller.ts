import { Request, Response } from "express";
import { OfferDataAccessor } from "../../data-accessors/offer.data-accessor";
import { RewardOfferBlockly } from "../../blockly/block-sets/offers/reward-offer.blockly";
import {
  BlocklyDataService,
  BlocklyHttpService,
} from "../../blockly/blockly-services";
import { encodeBS64 } from "../../helpers";
const generateDRL = async (req: Request, res: Response) => {
  const { offerId } = req.params;
  const offerDataAccessor = new OfferDataAccessor();

  try {
    // Get Offer Details
    const { data: offerData } = await offerDataAccessor.getOfferById(offerId);

    const {
      data: [offerDRLRes],
    } = await offerDataAccessor.getOfferDrlById(offerId);

    // Check If XML exists
    if (!offerDRLRes?.xml && offerDRLRes.xml.length > 0) {
      throw new Error("Rules are not configured for this offer.");
    }

    // Initialize BlocklyDataHelper
    const blocklyHttpService = new BlocklyHttpService();
    const blocklyDataHelper = new BlocklyDataService(blocklyHttpService);

    await blocklyDataHelper.initialize();

    const rewardOfferBlockly = new RewardOfferBlockly(
      blocklyDataHelper,
      offerData
    );

    const drl = rewardOfferBlockly.getDRL(offerDRLRes.xml);

    rewardOfferBlockly.clearWorkspace();
    const json = rewardOfferBlockly.getJSON(offerDRLRes.xml);
    rewardOfferBlockly.clearWorkspace();
    console.log("DRL", drl);
    return res.json({ drl: encodeBS64(drl), json: encodeBS64(json) });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message ?? "Internal Server Error.",
      error: JSON.stringify(error),
    });
  }
};
export { generateDRL };
