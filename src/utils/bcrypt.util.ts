import bcrypt from 'bcrypt';
const saltRounds = 10;
const salt ='$2b$10$8CRU2xZzXZ2L5IiYClILWu'

const generateHash = async (password: string) => {
  return bcrypt.hashSync(password, saltRounds);
}
const generateHashapikey = async (password: string) => {
  return bcrypt.hash(password, salt);
}

const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
}

export default {
  generateHash,
  comparePassword,
  generateHashapikey
}