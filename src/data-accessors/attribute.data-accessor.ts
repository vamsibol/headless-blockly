import axios from "axios";
import { EnvironmentHelper } from "../helpers/environment.helper";

export class AttributeDataAccessor {
  endpoint: string;
  constructor() {
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
    return axios.get(`${this.endpoint}/custom/?module_type=${moduleType}`);
  }
}
