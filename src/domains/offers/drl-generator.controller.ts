import { Request, Response } from "express";
import { OfferDataAccessor } from "../../data-accessors/offer.data-accessor";
import { RewardOfferBlockly } from "../../blockly/block-sets/offers/reward-offer.blockly";
const generateDRL = async (req: Request, res: Response) => {
  const { offerId } = req.params;
  const offerDataAccessor = new OfferDataAccessor();
  // Get Offer Details
  try {
    const { data: offerData } = await offerDataAccessor.getOfferById(offerId);
    const {
      data: [offerDRLRes],
    } = await offerDataAccessor.getOfferDrlById(offerId);

    // Check If XML exists
    if (!offerDRLRes?.xml && offerDRLRes.xml.length > 0) {
      throw new Error("Rules are not configured for this offer.");
    }

    const rewardOfferBlockly = new RewardOfferBlockly(offerData);
    const drl = rewardOfferBlockly.getDRL(offerDRLRes.xml);
    rewardOfferBlockly.clearWorkspace();
    return res.json({ drl });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message ?? "Internal Server Error.",
      error: JSON.stringify(error),
    });
  }
};
export { generateDRL };
