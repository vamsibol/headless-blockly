import express from "express";
import Blockly from "blockly";
import { appRoutes } from "./routes";

export const drlGenerator = new Blockly.Generator("DRL");

// Constants
const PORT = 3000;
const app = express();

app.use(express.json());

function initializeServer(cb?: Function) {
  app.use(appRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (cb) {
      cb();
    }
  });
}

export { initializeServer };
