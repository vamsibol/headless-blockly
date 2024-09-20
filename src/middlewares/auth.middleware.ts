import axios from "axios";
import { NextFunction, Request, Response } from "express";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.common["X-CSRFToken"] = "xsrf";

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  next();
};
