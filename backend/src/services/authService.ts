import { generateToken } from '../utils/jwt';
import { validateVerificationCode, sendVerificationEmail } from '../utils/email';
import { findUserByEmail, addUser } from '../utils/users';
import { hashPassword, comparePassword } from '../utils/hash';
import { jwtDecode } from 'jwt-decode';

export const generateAuthToken = (email: string) => {
  return generateToken({ email });
};

export const validateUserVerificationCode = (email: string, code: string) => {
  return validateVerificationCode(email, code);
};

export const sendUserVerificationEmail = (email: string) => {
  return sendVerificationEmail(email);
};

export const registerUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  addUser({ username, email, password: hashedPassword });
};

export const loginUser = async (email: string, password: string) => {
  const user = findUserByEmail(email);
  if (!user || !user.password) return null;
  const isPasswordValid = await comparePassword(password, user.password);
  return isPasswordValid ? user : null;
};

export const loginWithGoogle = (token: string) => {
  const decoded = jwtDecode<{ email: string; name?: string }>(token);
  let user = findUserByEmail(decoded.email);
  if (!user) {
    user = { email: decoded.email, username: decoded.name };
    addUser(user);
  }
  return user;
};