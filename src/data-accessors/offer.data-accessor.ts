import axios, { AxiosResponse } from "axios";
import { EnvironmentHelper } from "../helpers/environment.helper";
import { IOfferDRL } from "../interfaces/offer-drl.interface";

export class OfferDataAccessor {
  endpoint = `${EnvironmentHelper.getHost()}/offers`;
  token =
    "JWT " +
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzk2MzEyLCJ1c2VybmFtZSI6IlJQQ1c2VEYiLCJleHAiOjE3MjU5NzQ4NDksImVtYWlsIjoidmFtc2lrcmlzaG5hLmtvZGltZWxhQGxqaS5pbyIsIm9yaWdfaWF0IjoxNzI1OTYwNDQ5LCJhY2Nlc3NfbWFzayI6NjIsInByb2dyYW1faWQiOjI5LCJleHBfbXMiOjE3MjU5NzQ4NDkxODEsInJvbGVfaWQiOjEsImFjY2Vzc19sZXZlbCI6IlByb2dyYW0iLCJhcGlfZW5hYmxlZCI6ZmFsc2UsInN5c191c2VyX2lkIjoyNjQ0fQ.GVSal2FZE1O9Kzk5wB6oDc9h1ImcDgWeSxVz30tBLVdAb8WO8-HaSJCNxhnmh5qNYSlEr4gIhtV9fkMSmNMjGczXq8WlaWgZMEKKLHLZrkB_UQCJqgbK3nyfTuhL6cm5OfFQvMyVIBVUSkzNFgPh9O55qUL1Ws3dxzHQ6_a1ZMMyJBc0HgubnJNu5hsGiCbrZ1qaxOqj9APssdSt2oFpgGOMvVpkiPoOfXS8R2cmTlbwMLd3xVJyQ1YH4QtpQ9GMbaemUCcmGfsdd_4xRz7lS4kGIe2vtdD-qXuy2LCnHnfsZkbRdQM45X0Z5ydvD-8JGhnO7rNa8GtUgl3iHruETQ";
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
