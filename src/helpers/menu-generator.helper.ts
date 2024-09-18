import * as Blockly from "blockly";

export const MenuGeneratorHelper = (
  data: any[],
  key: string,
  value: string
): Blockly.MenuOption[] => {
  return [
    ["--", ""],
    ...data.map<Blockly.MenuOption>((attribute: any) => {
      return [attribute[value], attribute[key]];
    }),
  ];
};
