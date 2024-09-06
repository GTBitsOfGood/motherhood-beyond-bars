import * as express from "express";
import { body } from "express-validator";
import db from "../../../shared/db";
import admin from "../../../shared/admin";
import { validateRequest } from "../../common/middleware/validateRequest";
import { protectedRoute } from "../../common/middleware/protectedRoute";
import { InternalServerError } from "../../common/errors/internalServerError";

const router = express.Router();
const firestore = admin.firestore;

router.post(
  "/",
  protectedRoute,
  [
    body("items").isArray(),
    body("items.*.itemName")
      .not()
      .isEmpty()
      .withMessage("itemName is required"),
    body("items.*.itemQuantity")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("itemQuantity is required"),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response) => {
    try {
      const userID =
        process.env.NODE_ENV !== "production"
          ? req.body.id
          : req.currentUser?.uid;
      const user = db.collection("caregivers").doc(userID);

      const items = req.body.items.map((item: any) => {
        return {
          name: item.itemName,
          displayName: item.itemDisplayName,
          quantity: item.itemQuantity,
          fulfilled: false,
          requestedOn: firestore.FieldValue.serverTimestamp(),
          reqestedBy: user,
        };
      });

      const requestItems = db.collection("app").doc("requestItems");

      await requestItems.update({
        requests: firestore.FieldValue.arrayUnion(...items),
      });

      res.status(201).send();
    } catch (error) {
      let errorMessage = "Unable to create items";
      if (error instanceof Error) {
        errorMessage = `Unable to create items - ${error.message}`;
      }
      throw new InternalServerError(errorMessage);
    }
  }
);

export { router as newItemRequestRouter };
