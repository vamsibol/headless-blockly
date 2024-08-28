const decodeBS64 = (str: string): string => {
  return Buffer.from(str, "base64").toString("utf-8");
};

const encodeBS64 = (str: string): string => {
  return Buffer.from(str).toString("base64");
};

export { decodeBS64, encodeBS64 };
