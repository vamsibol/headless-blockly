import axios, { AxiosResponse } from "axios";
import { EnvironmentHelper } from "../helpers/environment.helper";
import { IOfferDRL } from "../interfaces/offer-drl.interface";

export class OfferDataAccessor {
  endpoint = `${EnvironmentHelper.getHost()}/offers`;
  token = EnvironmentHelper.getEnvVariable("JWT_TOKEN");
  async getOfferDrlById(
    offerId: string
  ): Promise<AxiosResponse<IOfferDRL[], any>> {
    const requestUrl: string = `${this.endpoint}/${offerId}/drl/`;
    return axios.get<IOfferDRL[]>(requestUrl, {
      headers: {
        Authorization: this.token,
        "X-CSRFToken": "xsrf",
      },
    });
  }
  async getOfferById(offerId: string): Promise<AxiosResponse<any, any>> {
    const requestUrl: string = `${this.endpoint}/${offerId}/`;
    return axios.get<any>(requestUrl, {
      headers: {
        Authorization: this.token,
        "X-CSRFToken": "xsrf",
      },
    });
  }
}
