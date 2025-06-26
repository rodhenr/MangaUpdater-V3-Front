export const parseStringToNumber = (str: string | null) => {
  if (str === null) return null;

  const cleanedStr = str.replace(/[^\d.]/g, "");

  const number = parseFloat(cleanedStr);

  return isNaN(number) ? null : number;
};
