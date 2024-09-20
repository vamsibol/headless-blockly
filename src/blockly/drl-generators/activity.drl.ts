import * as Blockly from "blockly";

export const ActivityBlockGenerator = (extraData: any) => {
  let activity_id: number = 1;
  return (block: Blockly.Block, generator: Blockly.CodeGenerator) => {
    let activity_filters = generator
      ?.statementToCode(block, "ACTIVITY_CRITERIA")
      .trim();


    let multi_sponsorids = "";
    if (activity_filters.length > 0) {
      activity_filters = activity_filters.replace(/\n/g, " &&");
      if (activity_filters.lastIndexOf(" &&") + 3 == activity_filters.length) {
        activity_filters = activity_filters.slice(
          0,
          activity_filters.lastIndexOf(" &&")
        );
      }
      activity_filters = " && (" + activity_filters + ")";
    }
    if (extraData.offer !== undefined) {
      if (extraData.offer.sponsors_data.length > 1) {
        for (
          var sponids = 0;
          sponids < extraData.offer.sponsors_data.length;
          sponids++
        ) {
          if (sponids == 0) {
            var h_spon_id =
              " && ((" +
              'readAttributeS("h_sponsor_id") == ("' +
              extraData.offer.sponsors_data[sponids].id +
              '"))';
            multi_sponsorids = multi_sponsorids + h_spon_id;
          } else {
            var sponsor_ids =
              ' || (readAttributeS("h_sponsor_id") == ("' +
              extraData.offer.sponsors_data[sponids].id +
              '"))';
            multi_sponsorids = multi_sponsorids + sponsor_ids;
          }
          if (sponids == extraData.offer.sponsors_data.length - 1) {
            multi_sponsorids = multi_sponsorids + ")";
          }
        }
      }
    }
    let statements_rules = generator?.statementToCode(block, "RULES").trim();
    let code = `rule "activity-{{offerid}}-{{activityid}}" \${offer_priority}
	when
		$activity : BitExecutionContext(\${header_eligibility_check} && (readAttributeS("h_bit_type") != "EVENT") {{activity_filters}} {{multi_sponsorids}})
	then
		String ruleTag = "";
		ReadHelper bitHeader = null;
		ReadHelper bit = null;
		ReadHelper bitPayment = null;
		{{rules}}
    end
`;
    code = code
      .replace(/{{offerid}}/gi, extraData.offer.id)
      .replace(/{{activityid}}/gi, activity_id.toString())
      .replace(/{{activity_filters}}/gi, activity_filters)
      .replace(/{{multi_sponsorids}}/gi, multi_sponsorids)
      .replace(/{{rules}}/gi, statements_rules);
    activity_id++;
    return code;
  };
};
