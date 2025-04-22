import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET as string;

export const generateToken = (user:any) => {
  return jwt.sign({
    id: user._id,
    email: user.email
  }, SECRET, {
    expiresIn: '1h'});
}