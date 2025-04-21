import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || "mysecretkey";

export const generateToken = (user:any) => {
  return jwt.sign({
    id: user._id,
    email: user.email
  }, SECRET, {
    expiresIn: '1h'});
}