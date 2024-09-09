import { Router } from "express";
import { offerRoutes } from "../domains/offers";

const appRoutes = Router();

appRoutes.use("/offers", offerRoutes);

export { appRoutes };
