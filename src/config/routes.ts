import { Router } from "express";
import { offerRoutes } from "../offers/offer.routes";

const appRoutes = Router();

appRoutes.use("/offers", offerRoutes);

export { appRoutes };
