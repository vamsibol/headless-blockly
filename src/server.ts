import express from "express";
import Blockly from "blockly";

export const drlGenerator = new Blockly.Generator('DRL');


// Constants
const PORT = 3000;
const app = express();

function initializeServer(cb?: Function) {
    app.get("/", (req, res) => {


        Blockly.Blocks['string_length'] = {
            init: function () {
                this.appendValueInput('VALUE')
                    .setCheck('String')
                    .appendField('length of');
                this.setOutput(true, 'Number');
                this.setColour(160);
                this.setTooltip('Returns number of letters in the provided text.');
                this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
            },

        };
        drlGenerator.forBlock['string_length'] = function (block, generator) {
            return ["len('Sample String')", 1];
        }
        const demoWorkspace = new Blockly.Workspace();
        // const json = {
        //     "blocks": {
        //         "languageVersion": 0,
        //         "blocks": [
        //             {
        //                 "type": "controls_if",
        //                 "x": 20,
        //                 "y": 20,
        //                 "inline": false,
        //                 "extraState": {
        //                     "hasElse": true
        //                 },
        //                 "inputs": {
        //                     "IF0": {
        //                         "block": {
        //                             "type": "logic_compare",
        //                             "fields": {
        //                                 "OP": "EQ"
        //                             },
        //                             "inputs": {
        //                                 "A": {
        //                                     "block": {
        //                                         "type": "math_arithmetic",
        //                                         "fields": {
        //                                             "OP": "MULTIPLY"
        //                                         },
        //                                         "inputs": {
        //                                             "A": {
        //                                                 "block": {
        //                                                     "type": "math_number",
        //                                                     "fields": {
        //                                                         "NUM": 6
        //                                                     }
        //                                                 }
        //                                             },
        //                                             "B": {
        //                                                 "block": {
        //                                                     "type": "math_number",
        //                                                     "fields": {
        //                                                         "NUM": 7
        //                                                     }
        //                                                 }
        //                                             }
        //                                         }
        //                                     }
        //                                 },
        //                                 "B": {
        //                                     "block": {
        //                                         "type": "math_number",
        //                                         "fields": {
        //                                             "NUM": 42
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     },
        //                     "DO0": {
        //                         "block": {
        //                             "type": "text_print",
        //                             "inline": false,
        //                             "inputs": {
        //                                 "TEXT": {
        //                                     "block": {
        //                                         "type": "text",
        //                                         "fields": {
        //                                             "TEXT": "Don't panic"
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     },
        //                     "ELSE": {
        //                         "block": {
        //                             "type": "text_print",
        //                             "inline": false,
        //                             "inputs": {
        //                                 "TEXT": {
        //                                     "block": {
        //                                         "type": "text",
        //                                         "fields": {
        //                                             "TEXT": "Panic"
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         ]
        //     }
        // }

        const ele = `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="string_length" id="!P]npEkKP[yw[b%lATM-" x="188" y="88"></block>
      </xml>`;
        // string to xml element
        try {
            const elem = Blockly.utils.xml.textToDom(ele);
            Blockly.Xml.domToWorkspace(elem, demoWorkspace);
            const code = drlGenerator.workspaceToCode(demoWorkspace);
            res.json({ drl: code });
        } catch (e: any) {
            res.status(400).json({ error: e?.message ?? "Invalid XML" });
        }

    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        if (cb) {
            cb();
        }
    });
}

export { initializeServer };