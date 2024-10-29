
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

// Middleware to authenticate JWT token and pass the user info to GraphQL context
export const authenticateToken = (req: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err:any, user:any) => {
      if (err) {
        return req; // Forbidden if token is invalid
      }

      // Attach the user payload to the request, so it can be passed to the GraphQL context
      req.user = user as JwtPayload;
      return req;
    });
  
    return req; // Unauthorized if token is missing
  }
};

// Helper function to sign a JWT token for a user
export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};