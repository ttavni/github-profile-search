export const ipExtractor = (message: string) => {
  const regex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const ip = message.match(regex);
  if (ip) {
    return ip[0];
  }
};
