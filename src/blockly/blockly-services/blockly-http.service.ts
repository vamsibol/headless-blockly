import { EnvironmentHelper } from "../../helpers/environment.helper";
import { AttributeDataAccessor } from "../../data-accessors/attribute.data-accessor";

export class BlocklyHttpService {
  attributeDataAccessor: AttributeDataAccessor;
  constructor() {
    const token = EnvironmentHelper.getEnvVariable("JWT_TOKEN");
    this.attributeDataAccessor = new AttributeDataAccessor(token);
  }

  fetchSponsorAttributes() {
    return this.attributeDataAccessor.getCustomAttributes("SPONSOR");
  }
}
