import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return { payload: jwt.verify(token, JWT_SECRET), error: null };
  } catch (error) {
    return { payload: null, error: error.message };
  }
}

export function setTokenCookie(token) {
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export function removeTokenCookie() {
  cookies().delete('token');
}

export function getTokenFromCookie() {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value || null;
}