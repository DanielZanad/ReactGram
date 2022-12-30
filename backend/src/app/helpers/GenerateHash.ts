import { genSalt, hash } from 'bcryptjs';

export const generatePasswordHash = async (password: string) => {
  const salt = await genSalt();
  const passwordHash = await hash(password, salt);
  return passwordHash;
};
