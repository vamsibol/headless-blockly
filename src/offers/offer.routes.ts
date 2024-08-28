import { Router } from "express";
import { generateDRL } from "./drl-generator.controller";

const offerRoutes = Router();

offerRoutes.route("/:offerId/drl").post(generateDRL);

export { offerRoutes };
