import axios, { AxiosResponse } from "axios";
import { EnvironmentHelper } from "../helpers/environment.helper";
import { IOfferDRL } from "../interfaces/offer-drl.interface";

export class OfferDataAccessor {
  endpoint = `${EnvironmentHelper.getHost()}/offers`;
  async getOfferDrlById(
    offerId: string
  ): Promise<AxiosResponse<IOfferDRL[], any>> {
    const requestUrl: string = `${this.endpoint}/${offerId}/drl/`;
    return axios.get<IOfferDRL[]>(requestUrl);
  }
  async getOfferById(offerId: string): Promise<AxiosResponse<any, any>> {
    const requestUrl: string = `${this.endpoint}/${offerId}/`;
    return axios.get<any>(requestUrl);
  }
}
