import axios from "axios";
import { EnvironmentHelper } from "../helpers/environment.helper";

export class AttributeDataAccessor {
  token: string;
  endpoint: string;
  constructor(jwtToken: string) {
    this.token = jwtToken;
    this.endpoint = `${EnvironmentHelper.getHost()}/attributelibrary`;
  }
  getCustomAttributes(
    moduleType:
      | "SPONSOR"
      | "SPONSORLOCATION"
      | "PAYMENT_METHOD"
      | "PRODUCT"
      | "PRODUCTOFFER"
      | "AIRPORT"
      | "MEMBER_SEGMENTATION"
  ) {
    return axios.get(`${this.endpoint}/custom/?module_type=${moduleType}`, {
      headers: {
        Authorization: this.token,
        "X-CSRFToken": "xsrf",
      },
    });
  }
}
