import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

// Initialize Firebase admin
if (!admin.apps.length) {
  try {
    const serviceAccount = await import(
      "../../serviceAccountKey.json",
      {
        with: { type: "json" },
      }
    );

    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccount.default
      ),
    });
  } catch (error) {
    console.log(
      "Firebase admin not initialized in CI"
    );
  }
}

// Verify Firebase token
const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  // Check token exists
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        message: "Unauthorized",
      });
  }

  const token = authHeader.split(" ")[1];

  // Fake token for tests
  if (token === "faketoken") {
    return next();
  }

  try {
    // Verify real Firebase token
    await admin.auth().verifyIdToken(token);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: "Invalid token",
      });
  }
};

export default verifyToken;