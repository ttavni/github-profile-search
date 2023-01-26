export const usernameValidator = (username: string) => {
  const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  const valid = regex.test(username);
  return valid;
};
