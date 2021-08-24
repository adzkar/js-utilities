export const passwordRegexVal = /(?=.*\d)(?=.*[a-zA-Z]).{8,}/;

export const generatePassword = () => {
  const length = 16;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  const lengthChar = charset.length;
  let i = 0;
  while (i < length) {
    password += charset.charAt(Math.floor(Math.random() * lengthChar));
    i += 1;
  }
  return password;
};
