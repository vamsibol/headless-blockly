import * as Blockly from "blockly";
import { BlocklyDataService } from "../blockly-services";
export const ActivityCriteriaBlockGenerator =
  (extraData: {
    isBluePrintOffer: boolean;
    offer: any;
    blocklyDataService: BlocklyDataService;
  }) =>
  (block: Blockly.Block, generator: Blockly.CodeGenerator) => {
    const object = block.getFieldValue("OBJECT");
    const attribute = block.getFieldValue("attribute");
    const attribute_level = block.getFieldValue("attribute_level");
    let lhs = "",
      rhs = "",
      code = "",
      rhs_value: any,
      rhs_length,
      i: any,
      code_in = "",
      code_p = "",
      rhs1,
      payment_array: any = [],
      LHSDataType = "",
      RHSDataType = "";
    const offerId = extraData.offer.id;
    const attributeData =
      extraData.blocklyDataService.customAttributeStore[object]?.[attribute];
    const attributeDataType =
      attribute_level === "MR_S" ? attributeData.data_type : "NUMBER";
    const is_line = attributeData?.line_level ?? false;
    const airportsType = block.getFieldValue("airporttypes");

    let dropdownOperator = block.getFieldValue("operators");
    const paymentDropdownOperator = block.getFieldValue("payment_operators");

    const allowMultiple = attributeData?.allow_multiple ?? false;
    let allowMultipleBlueprintvar =
      extraData.isBluePrintOffer &&
      block.getFieldValue("blueprinttypes") != null &&
      block.getFieldValue("value") != null;

    if (
      dropdownOperator === "null" &&
      attribute_level !== "MA_CA" &&
      attribute_level !== "MA_CC"
    ) {
      return (
        NullCheckGenerator(
          object,
          attribute,
          attribute_level,
          offerId,
          airportsType
        ) + " && "
      );
    } else if (
      dropdownOperator === "not_null" &&
      attribute_level !== "MA_CA" &&
      attribute_level !== "MA_CC"
    ) {
      if (CheckCustomEntity(attribute_level)) {
        return (
          "(!" +
          NullCheckGenerator(object, attribute, attribute_level) +
          ") && "
        );
      } else {
        return (
          "(!" +
          NullCheckGenerator(
            object,
            attribute,
            attribute_level,
            offerId,
            airportsType
          ) +
          ") && "
        );
      }
    } else if (dropdownOperator == "") {
      throw new Error(
        lhs + " Operator is not selected in Activity Criteria Block"
      );
    }

    // Based on the attributeType -> sponsor, activity,...
    switch (object) {
      case "sponsor":
        if (!attribute) {
          throw new Error("Sponsor attribute is not selected.");
        }
        switch (attributeDataType) {
          case "NUMBER":
            lhs = "readSponsorAttributeN" + '("' + attribute + '")';
            if (
              extraData.isBluePrintOffer &&
              block.getFieldValue("blueprinttypes") != null &&
              allowMultipleBlueprintvar
            ) {
              lhs = "existInListN(" + lhs;
            }
            break;
          case "DATE":
            SetLhsDataType(attributeDataType);
            lhs = BitSponsorDateActivityCriteria(
              attribute,
              block.getFieldValue("date_operator")
            );
            /* existInListD(DateUtils.getDate(readAttributeS("h_bit_date")), "${bit_date_allow_multiple_variable}") NEW DRL for blueprint in notin allow multiple variable*/
            if (
              extraData.isBluePrintOffer &&
              block.getFieldValue("blueprinttypes") != null &&
              allowMultipleBlueprintvar
            ) {
              lhs =
                (block.getFieldValue("date_operator") == "DATE"
                  ? "existInListD("
                  : "existInListN(") + lhs;
            }
            break;
          case "DATETIME":
            SetLhsDataType(attributeDataType);
            lhs = BitSponsorDateActivityCriteria(
              attribute,
              block.getFieldValue("datetime_operator")
            );
            // existInListD(DateUtils.getDate(readAttributeS("h_bit_date")), "${bit_date_allow_multiple_variable}") NEW DRL for blueprint in notin allow multiple variable
            if (
              extraData.isBluePrintOffer &&
              block.getFieldValue("blueprinttypes") != null &&
              allowMultipleBlueprintvar
            ) {
              lhs =
                (block.getFieldValue("datetime_operator") == "DATE"
                  ? "existInListD("
                  : "existInListN(") + lhs;
            }
            break;
          default:
            if (
              allowMultiple &&
              (dropdownOperator === "in" ||
                dropdownOperator === "not_in" ||
                dropdownOperator === "==" ||
                dropdownOperator === "!=")
            ) {
              lhs =
                "checkMultiValuedAttributeContains" +
                '("' +
                object +
                '", ' +
                null +
                ", " +
                attribute_level +
                ', "' +
                attribute +
                '", "' +
                offerId +
                '")';
            } else {
              lhs = "readSponsorAttributeS" + '("' + attribute + '")';
              if (
                extraData.isBluePrintOffer &&
                block.getFieldValue("blueprinttypes") != null &&
                allowMultipleBlueprintvar
              ) {
                lhs = "existInListS(" + lhs;
              }
            }
        }
        break;
      default:
        break;
    }

    if (
      lhs === "" &&
      object !== "activity" &&
      payment_array &&
      payment_array.length === 0
    ) {
      throw new Error("Block is empty");
    }
    code = lhs;

    if (block.getFieldValue("attribute") === "amount") {
      if (
        paymentDropdownOperator !== "in" &&
        paymentDropdownOperator !== "not_in"
      ) {
        if (dropdownOperator === "in") {
          rhs = block.getFieldValue("value");
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
          if (rhs_value && rhs_value != "") {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in += code + "== (" + rhs_value[i] + ")" + ")" + "||";
            }
            code_in += code + "== (" + rhs_value[i] + ")" + ")";
          } else if (rhs === "") {
            throw new Error("payment amount is empty");
          } else {
            code_in = code + "== (" + rhs + ")";
          }
          code = code_in;
        } else if (dropdownOperator === "not_in") {
          rhs = block.getFieldValue("value");
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
          if (rhs_value && rhs_value != "") {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in += code + " != (" + rhs_value[i] + ")" + ")" + " && ";
            }
            code_in += code + " != (" + rhs_value[i] + ")" + ")";
          } else if (rhs === "") {
            throw new Error("payment amount is empty");
          } else {
            code_in = code + " != (" + rhs + ")";
          }
          code = code_in;
        } else if (dropdownOperator === "between") {
          var code_btw = "(" + code;
          rhs = generator.valueToCode(block, "RHS_INPUT", 0);
          if (rhs === "") {
            throw new Error(lhs + " is empty");
          }
          rhs1 = generator.valueToCode(block, "RHS_VALUE", 0);
          if (rhs1 === "") {
            throw new Error(lhs + " is empty");
          }
          code = `
            ${code_btw} > ${rhs})&&${code_btw} < " +
            ${rhs1})`;
        } else {
          rhs = generator.valueToCode(block, "RHS_INPUT", 0);
          if (rhs === "") {
            throw new Error(lhs + " is empty");
          }
          code += " " + dropdownOperator + " " + rhs;
        }
      } else if (
        payment_array.length !== 0 &&
        payment_array.length !== null &&
        payment_array !== undefined
      ) {
        if (dropdownOperator === "in") {
          rhs = block.getFieldValue("value");
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
          let v = 0,
            d = 0;
          if (rhs_value && rhs_value != "") {
            for (v = 0; v < rhs_length; v++) {
              for (d = 0; d < payment_array.length - 1; d++) {
                code = code_p + "(" + payment_array[d];
                code_in += code + ")" + " + ";
                code_p = "";
              }
              code_in += "(" + payment_array[d] + ") ";
              if (v !== rhs_length - 1) {
                code_p =
                  "(" + code_in + "==" + " " + rhs_value[v] + ")" + " || ";
              } else {
                code_p = "(" + code_in + "==" + " " + rhs_value[v] + ")";
              }
              d = 0;
              if (payment_array.length === 1) {
                code_in = code_p;
              } else {
                code_in = "";
              }
            }
            code = code_p;
          } else if (rhs === "") {
            throw new Error("payment amount is empty");
          }
        } else if (dropdownOperator === "not_in") {
          rhs = block.getFieldValue("value");
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
          if (rhs_value && rhs_value != "") {
            for (var g = 0; g < rhs_length; g++) {
              for (var u = 0; u < payment_array.length - 1; u++) {
                code = code_p + "(" + payment_array[u];
                code_in += code + ")" + " + ";
                code_p = "";
              }
              code_in += "(" + payment_array[u] + ") ";
              if (g !== rhs_length - 1) {
                code_p =
                  "(" + code_in + "!=" + " " + rhs_value[g] + ")" + " && ";
              } else {
                code_p = "(" + code_in + "!=" + " " + rhs_value[g] + ")";
              }
              u = 0;
              if (payment_array.length === 1) {
                code_in = code_p;
              } else {
                code_in = "";
              }
            }
            code = code_p;
          } else if (rhs === "") {
            throw new Error("payment amount is empty");
          }
        } else if (dropdownOperator === "between") {
          rhs = generator.valueToCode(block, "RHS_INPUT", 0);
          rhs1 = generator.valueToCode(block, "RHS_VALUE", 0);
          if (rhs !== "" && rhs1 !== "") {
            var rhs_list = [rhs, rhs1];
            for (var f = 0; f < rhs_list.length; f++) {
              for (var c = 0; c < payment_array.length - 1; c++) {
                code = code_p + "(" + payment_array[c];
                code_in += code + ")" + " + ";
                code_p = "";
              }
              code_in += "(" + payment_array[c] + ") ";
              if (f !== rhs_list.length - 1) {
                code_p =
                  "(" + code_in + ">" + " " + rhs_list[f] + ")" + " && (";
              } else {
                code_p = code_in + "<" + " " + rhs_list[f] + ")";
              }
              c = 0;
              if (payment_array.length === 1) {
                code_in = code_p;
              } else {
                code_in = "";
              }
            }
            code = code_p;
          } else if (rhs === "" || rhs1 === "") {
            throw new Error("payment amount is empty");
          }
        } else {
          for (var o = 0; o < payment_array.length - 1; o++) {
            //rhs = block.getFieldValue('value');
            //rhs_value = rhs.split(",");
            //rhs_length = rhs_value.length;

            code = "(" + payment_array[o];
            code_in += code + ")" + "+";
          }
          code_in += "(" + payment_array[o] + ") ";
          if (generator.valueToCode(block, "RHS_INPUT", 0) !== "") {
            code =
              code_in +
              dropdownOperator +
              " " +
              generator.valueToCode(block, "RHS_INPUT", 0);
          } else {
            throw new Error("payment amount is empty");
          }
        }
      }
    } else if (dropdownOperator === "in") {
      if (attributeDataType == "NUMBER") {
        rhs = block.getFieldValue("value");
        if (window.location.href.indexOf("offerblueprintrules/") !== -1) {
          if (block.getFieldValue("blueprinttypes")) {
            rhs = "${" + rhs + "}";
          }
        }
        if (!rhs) {
          throw new Error(
            attribute_level !== "MR_S"
              ? attribute + " is empty"
              : "Retention Scores are empty"
          );
        }
        if (rhs) {
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
        }
        if (rhs_value && rhs_value != "") {
          // (existInListN(readAttributeN("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            window.location.href.indexOf("offerblueprintrules/") !== -1 &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in += code + "== (" + rhs_value[i] + ")" + ")" + "||";
            }
            code_in += code + "== (" + rhs_value[i] + ")" + ")";
          }
        } else {
          // (existInListN(readAttributeN("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            window.location.href.indexOf("offerblueprintrules/") !== -1 &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code_in = code + "== (" + rhs + ")";
          }
        }
        code = "(" + code_in + ")";
      } else if (
        attributeDataType == "DATE" ||
        attributeDataType == "DATETIME"
      ) {
        rhs = block.getFieldValue("value");
        if (window.location.href.indexOf("offerblueprintrules/") !== -1) {
          if (block.getFieldValue("blueprinttypes")) {
            rhs = "${" + rhs + "}";
          }
        }
        if (!rhs) {
          throw new Error(attribute + " is empty");
        }
        if (rhs) {
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
        }
        // existInListD(DateUtils.getDate(readAttributeS("h_bit_date")), "${bit_date_allow_multiple_variable}") NEW DRL for blueprint in notin allow multiple variable
        if (
          window.location.href.indexOf("offerblueprintrules/") !== -1 &&
          block.getFieldValue("blueprinttypes") != null &&
          allowMultipleBlueprintvar
        ) {
          code_in = code + ", " + '"' + rhs + '"' + ")";
        } else {
          if (rhs_value && rhs_value != "") {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              if (CheckDateDataType(code) === "STRING") {
                code_in +=
                  code + '.compareTo("' + rhs_value[i] + '")==0' + ")" + "||";
              } else {
                code_in += code + "==(" + rhs_value[i] + ")" + ")" + "||";
              }
            }
            if (CheckDateDataType(code) === "STRING") {
              code_in += code + '.compareTo("' + rhs_value[i] + '")==0' + ")";
            } else {
              code_in += code + "==(" + rhs_value[i] + ")" + ")";
            }
          } else if (CheckDateDataType(code) === "STRING") {
            code_in = code + ".compareTo(" + rhs + '")==0';
          } else {
            code_in = code + "==(" + rhs_value[i] + ")";
          }
        }

        code = "(" + code_in + ")";
      } else {
        rhs = block.getFieldValue("value");
        if (window.location.href.indexOf("offerblueprintrules/") !== -1) {
          if (block.getFieldValue("blueprinttypes")) {
            rhs = "${" + rhs + "}";
          }
        }
        if (!rhs) {
          throw new Error(attribute + " is empty");
        }
        //rhs = rhs.toLowerCase();
        if (rhs) {
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
        }
        if (allowMultiple) {
          if (rhs_value && rhs_value != "") {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in +=
                code +
                ".contains(" +
                '"' +
                rhs_value[i] +
                '"' +
                ")" +
                ")" +
                "||";
            }
            code_in +=
              code + ".contains(" + '"' + rhs_value[i] + '"' + ")" + ")";
          } else {
            code_in = code + ".contains(" + '"' + rhs + '"' + ")";
          }
        } else if (rhs_value && rhs_value != "") {
          // (existInListS(readAttributeS("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            window.location.href.indexOf("offerblueprintrules/") !== -1 &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in +=
                code + "== (" + '"' + rhs_value[i] + '"' + ")" + ")" + "||";
            }
            code_in += code + "== (" + '"' + rhs_value[i] + '"' + ")" + ")";
          }
        } else {
          // (existInListS(readAttributeS("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            window.location.href.indexOf("offerblueprintrules/") !== -1 &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code_in = code + "== (" + '"' + rhs + '"' + ")";
          }
        }

        code = "(" + code_in + ")";
      }
    } else if (dropdownOperator === "not_in") {
      if (attributeDataType == "NUMBER") {
        rhs = block.getFieldValue("value");
        if (window.location.href.indexOf("offerblueprintrules/") !== -1) {
          if (block.getFieldValue("blueprinttypes")) {
            rhs = "${" + rhs + "}";
          }
        }
        if (!rhs) {
          throw new Error(
            attribute_level !== "MR_S"
              ? attribute + " is empty"
              : "Retention Scores are empty"
          );
        }
        if (rhs) {
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
        }
        if (rhs_value && rhs_value != "") {
          // (existInListN(readAttributeN("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            extraData.isBluePrintOffer &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code = "!" + code;
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in += code + " != (" + rhs_value[i] + ")" + ")" + " && ";
            }
            code_in += code + " != (" + rhs_value[i] + ")" + ")";
          }
        } else {
          // (existInListN(readAttributeN("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            window.location.href.indexOf("offerblueprintrules/") !== -1 &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code = "!" + code;
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code_in = code + " != (" + rhs + ")";
          }
        }
        code = "(" + code_in + ")";
      } else if (
        attributeDataType == "DATE" ||
        attributeDataType == "DATETIME"
      ) {
        rhs = block.getFieldValue("value");
        if (window.location.href.indexOf("offerblueprintrules/") !== -1) {
          if (block.getFieldValue("blueprinttypes")) {
            rhs = "${" + rhs + "}";
          }
        }
        if (!rhs) {
          throw new Error(attribute + " is empty");
        }
        if (rhs) {
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
        }
        // existInListD(DateUtils.getDate(readAttributeS("h_bit_date")), "${bit_date_allow_multiple_variable}") NEW DRL for blueprint in notin allow multiple variable
        if (
          window.location.href.indexOf("offerblueprintrules/") !== -1 &&
          block.getFieldValue("blueprinttypes") != null &&
          allowMultipleBlueprintvar
        ) {
          code = "!" + code;
          code_in = code + ", " + '"' + rhs + '"' + ")";
        } else {
          if (rhs_value && rhs_value != "") {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              if (CheckDateDataType(code) === "STRING") {
                code_in +=
                  code + '.compareTo("' + rhs_value[i] + '")!=0' + ")" + " && ";
              } else {
                code_in += code + "!=(" + rhs_value[i] + ")" + ")" + " && ";
              }
            }
            if (CheckDateDataType(code) === "STRING") {
              code_in += code + '.compareTo("' + rhs_value[i] + '")!=0' + ")";
            } else {
              code_in += code + "!=(" + rhs_value[i] + ")" + ")";
            }
          } else if (CheckDateDataType(code) === "STRING") {
            code_in = code + ' .compareTo("' + rhs + '")!=0';
          } else if (rhs_value) {
            code_in = code + "!=(" + rhs_value[i] + ")";
          }
        }
        code = "(" + code_in + ")";
      } else {
        rhs = block.getFieldValue("value");
        if (window.location.href.indexOf("offerblueprintrules/") !== -1) {
          if (block.getFieldValue("blueprinttypes")) {
            rhs = "${" + rhs + "}";
          }
        }
        if (!rhs) {
          throw new Error(attribute + " is empty");
        }
        //rhs = rhs.toLowerCase();
        if (rhs) {
          rhs_value = rhs.split(",");
          rhs_length = rhs_value.length;
        }
        if (allowMultiple) {
          if (rhs_value && rhs_value != "") {
            code = "!(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in +=
                code +
                ".contains(" +
                '"' +
                rhs_value[i] +
                '"' +
                ")" +
                ")" +
                "||";
            }
            code_in +=
              code + ".contains(" + '"' + rhs_value[i] + '"' + ")" + ")";
          } else {
            code_in = code + ".contains(" + '"' + rhs + '"' + ")";
          }
        } else if (rhs_value && rhs_value != "") {
          // (!existInListS(readAttributeS("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            window.location.href.indexOf("offerblueprintrules/") !== -1 &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code = "!" + code;
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code = "(" + code;
            for (i = 0; i < rhs_length - 1; i++) {
              code_in +=
                code + " != (" + '"' + rhs_value[i] + '"' + ")" + ")" + " && ";
            }
            code_in += code + " != (" + '"' + rhs_value[i] + '"' + ")" + ")";
          }
        } else {
          // (!existInListS(readAttributeS("h_bit_type"), "${bit_type_lookup}")) NEW DRL for blueprint in notin allow multiple variable
          if (
            extraData.isBluePrintOffer &&
            block.getFieldValue("blueprinttypes") != null &&
            allowMultipleBlueprintvar
          ) {
            code = "!" + code;
            code_in = code + ", " + '"' + rhs + '"' + ")";
          } else {
            code_in = code + " != (" + '"' + rhs + '"' + ")";
          }
        }
        code = "(" + code_in + ")";
      }
    } else if (dropdownOperator === "between") {
      let code_bt = "";
      if (attributeDataType == "NUMBER") {
        rhs = generator.valueToCode(block, "RHS_INPUT", 0);
        rhs1 = generator.valueToCode(block, "RHS_VALUE", 0);
        if (rhs === "" || rhs1 === "") {
          throw new Error(
            attribute_level !== "MR_S"
              ? attribute + " is empty"
              : "Retention Score is empty"
          );
        }
        code_bt = "(" + code;
        if (lhs == "amount") {
          code_bt =
            "(" +
            'getPaymentAmount("' +
            block.getFieldValue("PAYMENT_MODE") +
            '")';
        }
        code = `(${code_bt} > ${rhs})&&${code_bt} < ${rhs1}))`;
      } else if (
        attributeDataType == "DATE" ||
        attributeDataType == "DATETIME"
      ) {
        rhs = generator.valueToCode(block, "RHS_INPUT", 0);
        rhs1 = generator.valueToCode(block, "RHS_VALUE", 0);
        if (rhs === "" || rhs1 === "") {
          throw new Error(attribute + " is empty");
        }
        code_bt = "(" + code;
        if (CheckDateDataType(code_bt) === "STRING") {
          code =
            "(" +
            code_bt +
            ".compareTo" +
            rhs +
            ">0)" +
            "&&" +
            code_bt +
            ".compareTo" +
            rhs1 +
            "<0)" +
            ")";
        } else {
          code =
            "(" +
            code_bt +
            ">" +
            rhs +
            ")" +
            "&&" +
            code_bt +
            "<" +
            rhs1 +
            ")" +
            ")";
        }
      }
    }
    // handle binary operators
    else if (attributeDataType == "NUMBER") {
      if (dropdownOperator !== "null" && dropdownOperator !== "not_null") {
        if (generator.valueToCode(block, "RHS_INPUT", 0)) {
          rhs = generator.valueToCode(block, "RHS_INPUT", 0);
        } else if (block.getFieldValue("value")) {
          rhs = block.getFieldValue("value");
        }
        if (rhs === "") {
          throw new Error(
            attribute_level !== "MR_S"
              ? attribute + " is empty"
              : "Retention score is empty"
          );
        }
        if (lhs == "amount") {
          code +=
            'getPaymentAmount("' + block.getFieldValue("PAYMENT_MODE") + '")';
        } else if (lhs === "") {
          code = 'readAttributeN("' + attribute + '")';
          code += " " + dropdownOperator + " " + rhs;
        } else {
          code += " " + dropdownOperator + " " + rhs;
        }
      }
    } else if (attributeDataType == "DATE" || attributeDataType == "DATETIME") {
      rhs = generator.valueToCode(block, "RHS_INPUT", 0);

      if (
        window.location.href.indexOf("offerblueprintrules/") !== -1 &&
        generator.valueToCode(block, "RHS_INPUT", 0)
      ) {
        // rhs = rhs.slice(0,1) + '"' + rhs.slice(1,rhs.length-1) + '"' + rhs.slice(rhs.length-1);
      }

      if (
        rhs === "" &&
        dropdownOperator !== "null" &&
        dropdownOperator !== "not_null"
      ) {
        throw new Error(attribute + " is empty");
      }
      if (dropdownOperator === "null") {
        code = code + " ==";
      } else if (dropdownOperator === "not_null") {
        code = code + " !=";
        dropdownOperator = "null";
      }
      if (CheckDateDataType(code) === "STRING" && attribute_level !== "MA_O") {
        code += ".compareTo" + rhs + "" + dropdownOperator + "0";
      } else {
        code += " " + dropdownOperator + " " + rhs;
      }
    } else if (dropdownOperator !== "null" && dropdownOperator !== "not_null") {
      // Filter block -> TEXT Type -> == operator
      // if offer blueprint rules -> get the rhs from blueprint-variable block and not a default rhs value
      rhs = '"' + block.getFieldValue("value") + '"';
      if (
        extraData.isBluePrintOffer &&
        generator.valueToCode(block, "RHS_INPUT", 0)
      ) {
        rhs = generator.valueToCode(block, "RHS_INPUT", 0);
        rhs = '"' + rhs + '"';
      } else if (block.getFieldValue("value")) {
        rhs = '"' + block.getFieldValue("value") + '"';
      }

      if (rhs === "" || rhs === '""') {
        throw new Error(attribute + " is empty");
      }
      if (attributeDataType === "TEXT") {
        switch (dropdownOperator) {
          case "starts_with":
            code = code + ".startsWith(" + rhs + ")";
            break;
          case "ends_with":
            code = code + ".endsWith(" + rhs + ")";
            break;
          case "not_contains":
            code = "!(" + code + ".contains(" + rhs + "))";
            break;
          default:
            code += " " + dropdownOperator + " " + rhs;
            break;
        }
      } else {
        if (dropdownOperator !== null) {
          code += " " + dropdownOperator + " " + rhs;
        }
      }
      if (allowMultiple) {
        if (dropdownOperator === "==") {
          code = lhs + ".contains(" + rhs + ")";
        } else if (dropdownOperator === "!=") {
          code = "!" + lhs + ".contains(" + rhs + ")";
        }
      } else if (dropdownOperator === "contains") {
        code = lhs + "." + dropdownOperator + "(" + rhs + ")";
      }
    } else {
      // Filter block -> TEXT Type -> == operator
      // if offer blueprint rules -> get the rhs from blueprint-variable block and not a default rhs value
      rhs = '"' + block.getFieldValue("value") + '"';
      if (
        extraData.isBluePrintOffer &&
        generator.valueToCode(block, "RHS_INPUT", 0)
      ) {
        // If block Text type attribute -> In operator Blueprint rules
        if (block.getFieldValue("blueprinttypes")) {
          rhs = "${" + block.getFieldValue("value");
          +"}"; // NOSONAR
        } else {
          rhs = generator.valueToCode(block, "RHS_INPUT", 0);
        }
      } else if (block.getFieldValue("value")) {
        rhs = '"' + block.getFieldValue("value") + '"';
      }
      if (rhs === "" || rhs === '""') {
        throw new Error(attribute + " is empty");
      }
      //rhs = rhs.toLowerCase();
      code += 'readAttributeS("' + rhs + '")';
      if (allowMultiple) {
        if (dropdownOperator === "==") {
          code = lhs + ".contains(" + rhs + ")";
        } else if (dropdownOperator === "!=") {
          code = "!" + lhs + ".contains(" + rhs + ")";
        }
      } else if (dropdownOperator === "contains") {
        code = lhs + "." + dropdownOperator + "(" + rhs + ")";
      }
    }

    return code;
  };

function NullCheckGenerator(...[]): string {
  return "null";
}

function CheckCustomEntity(...[]): boolean {
  return false;
}

function SetLhsDataType(...[]) {}

function BitSponsorDateActivityCriteria(...[]): string {
  return "BitSponsorDateActivityCriteria";
}

function CheckDateDataType(...[]): string {
  return "STRING";
}
