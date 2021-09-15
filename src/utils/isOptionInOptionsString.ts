export const isOptionInOptionsString = (
  option: string,
  optionsString: string,
): boolean => optionsString
  .toLowerCase()
  .split(',')
  .map((s) => s.trim())
  .includes(option.toLowerCase());
