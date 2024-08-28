import { Router } from "express";
import { offerRoutes } from "../offers";

const appRoutes = Router();

appRoutes.use("/offers", offerRoutes);

export { appRoutes };
