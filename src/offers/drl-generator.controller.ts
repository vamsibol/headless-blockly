import { Request, Response } from "express";
import { decodeBS64 } from "../helpers";

const generateDRL = async (req: Request, res: Response) => {
  const { offerId } = req.params;
  const { xml } = req.body;
  if (!xml) {
    return res.status(400).json({ message: "XML is required" });
  }
  const decodedXML = decodeBS64(xml);

  // Get Offer Details
  // Attach Offer Type Specific Blocks to DoM

  // Init Blockly
  // load Workspace
  // Inject XML
  // Generate DRL
  // Encode DRL to Base64
  // Return Response

  res.json({ xml: decodedXML, offerId });
};
export { generateDRL };
