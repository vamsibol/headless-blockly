import { EnvironmentHelper } from "../../helpers/environment.helper";
import { AttributeDataAccessor } from "../../data-accessors/attribute.data-accessor";

export class BlocklyHttpService {
  attributeDataAccessor: AttributeDataAccessor;
  constructor() {
    this.attributeDataAccessor = new AttributeDataAccessor();
  }

  fetchSponsorAttributes() {
    return this.attributeDataAccessor.getCustomAttributes("SPONSOR");
  }
}
