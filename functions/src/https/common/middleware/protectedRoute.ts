import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/forbiddenError";
import * as functions from "firebase-functions";
import admin from "../../../shared/admin";

declare global {
  namespace Express {
    interface Request {
      currentUser?: admin.auth.DecodedIdToken;
    }
  }
}

const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // For development
  if (process.env.NODE_ENV !== "production") {
    return next();
  }

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    throw new ForbiddenError();
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    throw new ForbiddenError();
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.currentUser = decodedIdToken;
    next();
  } catch (error) {
    functions.logger.error("Error while verifying Firebase ID token:", error);
    throw new ForbiddenError();
  }
};

export { protectedRoute };
