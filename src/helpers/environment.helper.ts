import dotenv from "dotenv";
dotenv.config();

export const EnvironmentHelper = {
  getEnvVariable: (key: string): string => {
    return process.env[key] || "https://gravtyqa.gravtee.com/";
  },

  getHost: (
    version: "v1" | "v2" | "v3" = "v1",
    api: "ai" | "bolapi" = "bolapi"
  ): string => {
    return `${EnvironmentHelper.getEnvVariable("HOST")}/${api}/${version}`;
  },
};
