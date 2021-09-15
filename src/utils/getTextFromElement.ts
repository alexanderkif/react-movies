export default (str: string): string => (str.split('>').length > 1 ? str.split('>')[1].split('<')[0] : str);
