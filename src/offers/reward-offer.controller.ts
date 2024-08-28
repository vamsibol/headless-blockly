import { Response } from "express";

const generateRewardRules = async (req: Request, res: Response) => {};
export { generateRewardRules };

// app.post("/offers/award/:offerId", (req, res) => {
//     const { offerId } = req.params;
//     const { xml } = req.body;
//     if (!xml) {
//       res.status(400).json({ error: "XML is required" });
//     }
//     const workspace = new Blockly.Workspace();
//     const ele = `<xml xmlns="https://developers.google.com/blockly/xml">
//         <block type="string_length" id="!P]npEkKP[yw[b%lATM-" x="188" y="88"></block>
//       </xml>`;
//     // string to xml element
//     try {
//       const elem = Blockly.utils.xml.textToDom(ele);
//       Blockly.Xml.domToWorkspace(elem, workspace);
//       const code = drlGenerator.workspaceToCode(workspace);
//       res.json({ drl: code });
//     } catch (e: any) {
//       res.status(400).json({ error: e?.message ?? "Invalid XML" });
//     }
//   });
