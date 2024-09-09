import axios, { AxiosResponse } from "axios";
import { EnvironmentHelper } from "../helpers/environment.helper";
import { IOfferDRL } from "../interfaces/offer-drl.interface";

export class OfferDataAccessor {
  endpoint = `${EnvironmentHelper.getHost()}/offers`;
  async getOfferDrlById(
    offerId: string
  ): Promise<AxiosResponse<IOfferDRL[], any>> {
    const requestUrl: string = `${this.endpoint}/${offerId}/drl/`;
    return axios.get<IOfferDRL[]>(requestUrl, {
      headers: {
        Authorization:
          "JWT " +
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzk2MzEyLCJ1c2VybmFtZSI6IlJQQ1c2VEYiLCJleHAiOjE3MjU4ODkwMzMsImVtYWlsIjoidmFtc2lrcmlzaG5hLmtvZGltZWxhQGxqaS5pbyIsIm9yaWdfaWF0IjoxNzI1ODc0NjMzLCJhY2Nlc3NfbWFzayI6NjIsInByb2dyYW1faWQiOjI5LCJleHBfbXMiOjE3MjU4ODkwMzM1ODgsInJvbGVfaWQiOjEsImFjY2Vzc19sZXZlbCI6IlByb2dyYW0iLCJhcGlfZW5hYmxlZCI6ZmFsc2UsInN5c191c2VyX2lkIjoyNjQ0fQ.KddTDRUsk0KE4WMz-ZZtpoivnYb-1IKY6CvNWgczkARulEzCqXkTAc8BR9tyI8Qcwvr04vyFfSNia20Y79--A0navrJOgYoqhGN9awQdx2XacsifLDgwM3Ta8XGivdjam90PJAv6aAirqd-RsX2AY_Zm6uSNL6UgfnFQtUvQnHPPJwkVrlu7eDE9UVKeOcFRbwR6B-Qh66iiiI5gyiGCwvUSSyFb4nir_D24Sna9irIP-XwATjwLhMllilsCuquG33dezeer1Ff4ue6SAfCd8ICy-YasuqvNMHpGnY6JHGqh22OPJOJBf2oluAzx-MBRX3yRFHPbJO3cs0-m7YJjzA",
        "X-CSRFToken": "xsrf",
      },
    });
  }
  async getOfferById(offerId: string): Promise<AxiosResponse<any, any>> {
    const requestUrl: string = `${this.endpoint}/${offerId}/`;
    return axios.get<any>(requestUrl, {
      headers: {
        Authorization:
          "JWT " +
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzk2MzEyLCJ1c2VybmFtZSI6IlJQQ1c2VEYiLCJleHAiOjE3MjU4ODkwMzMsImVtYWlsIjoidmFtc2lrcmlzaG5hLmtvZGltZWxhQGxqaS5pbyIsIm9yaWdfaWF0IjoxNzI1ODc0NjMzLCJhY2Nlc3NfbWFzayI6NjIsInByb2dyYW1faWQiOjI5LCJleHBfbXMiOjE3MjU4ODkwMzM1ODgsInJvbGVfaWQiOjEsImFjY2Vzc19sZXZlbCI6IlByb2dyYW0iLCJhcGlfZW5hYmxlZCI6ZmFsc2UsInN5c191c2VyX2lkIjoyNjQ0fQ.KddTDRUsk0KE4WMz-ZZtpoivnYb-1IKY6CvNWgczkARulEzCqXkTAc8BR9tyI8Qcwvr04vyFfSNia20Y79--A0navrJOgYoqhGN9awQdx2XacsifLDgwM3Ta8XGivdjam90PJAv6aAirqd-RsX2AY_Zm6uSNL6UgfnFQtUvQnHPPJwkVrlu7eDE9UVKeOcFRbwR6B-Qh66iiiI5gyiGCwvUSSyFb4nir_D24Sna9irIP-XwATjwLhMllilsCuquG33dezeer1Ff4ue6SAfCd8ICy-YasuqvNMHpGnY6JHGqh22OPJOJBf2oluAzx-MBRX3yRFHPbJO3cs0-m7YJjzA",
        "X-CSRFToken": "xsrf",
      },
    });
  }
}
