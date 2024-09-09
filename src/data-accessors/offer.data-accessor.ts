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
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzk2MzEyLCJ1c2VybmFtZSI6IlJQQ1c2VEYiLCJleHAiOjE3MjU4NzM3NzAsImVtYWlsIjoidmFtc2lrcmlzaG5hLmtvZGltZWxhQGxqaS5pbyIsIm9yaWdfaWF0IjoxNzI1ODU5MzcwLCJhY2Nlc3NfbWFzayI6NjIsInByb2dyYW1faWQiOjI5LCJleHBfbXMiOjE3MjU4NzM3NzAzNjQsInJvbGVfaWQiOjEsImFjY2Vzc19sZXZlbCI6IlByb2dyYW0iLCJhcGlfZW5hYmxlZCI6ZmFsc2UsInN5c191c2VyX2lkIjoyNjQ0fQ.cQSjBlKWfUK3UOpJLLmHJEgcHBHqY9UJYvpOGbaLXcYR2iU8geqJnghNq788G2cTZCLY6l236w6djzduTGuku3yKj6qNRIoB8sEs994xzrY3cWJKlMXx-kMbVFg1zuL2idPc3W_AT2th5fbe4zK10WJWiZOLHIGu9o1_dSUXFkfh6b-_Z6uy7mppmnh3djom5ykPXNH0Wll0h8moa7Jc3ujmyu2013sfGEZ98SEXaGn6tIs1PF5ILSCB-4koys4_xxTFLC2EepgIkMNUCPw6b8wVJk7qOr-KK1ynU7H_V8DRGWmuBYZD5gsbyg1nawcDQgTQ4MzmjZOBB8ticdntqg",
        "X-CSRFToken": "xsrf",
      },
    });
  }
}
