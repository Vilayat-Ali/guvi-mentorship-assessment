import type { Request } from "express";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export default AuthenticatedRequest;
