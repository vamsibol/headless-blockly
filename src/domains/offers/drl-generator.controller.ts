import { Request, Response } from "express";
import { decodeBS64 } from "../../helpers";
import { OfferDataAccessor } from "../../data-accessors/offer.data-accessor";

const generateDRL = async (req: Request, res: Response) => {
  const { offerId } = req.params;
  // if (!xml) {
  //   return res.status(400).json({ message: "XML is required" });
  // }
  // const decodedXML = decodeBS64(xml);
  const offerDataAccessor = new OfferDataAccessor();
  // Get Offer Details
  try {
    const {
      data: [offerDRLRes],
    } = await offerDataAccessor.getOfferDrlById(offerId);

    // Check If XML exists
    if (!offerDRLRes?.xml && offerDRLRes.xml.length > 0) {
      throw new Error("Rules are not configured for this offer.");
    }
    // Decode XML
    const decodedXML = decodeBS64(offerDRLRes.xml);
    // Attach Offer Type Specific Blocks to DoM
    // Init DRL Generator
    // Init Blockly
    // load Workspace
    // Inject XML
    // Generate DRL
    // Encode DRL to Base64
    // Return Response
    return res.json({ xml: decodedXML });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message ?? "Internal Server Error.",
      error: error,
    });
  }
  // Attach Offer Type Specific Blocks to DoM
};
export { generateDRL };
