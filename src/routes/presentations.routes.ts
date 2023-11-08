import { Router } from "express";
import {
  createPresentation,
  deletePresentation,
  getPresentation,
  getPresentations,
  updatePresentation,
} from "../services/presentation.services";
import {
  createPresentationSchema,
  deletePresentationSchema,
  getPresentationSchema,
  updatePresentationSchema,
} from "../schemas/presentation.schema";
import validatorHandler from "../middlewares/validationHandler";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const presentations = await getPresentations();
    res.json(presentations);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:presentation_id",
  validatorHandler(getPresentationSchema, "params"),
  async (req, res, next) => {
    try {
      const presentation = await getPresentation(
        Number(req.params.presentation_id)
      );

      if (!presentation) {
        return res.status(404).json({
          message: "Presentation not found",
        });
      }

      res.json(presentation);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createPresentationSchema, "body"),
  async (req, res, next) => {
    try {
      const newPresentation = await createPresentation(req.body);
      res.json(newPresentation);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:presentation_id",
  validatorHandler(getPresentationSchema, "params"),
  validatorHandler(updatePresentationSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedPresentation = await updatePresentation(
        Number(req.params.presentation_id),
        req.body
      );

      res.json(updatedPresentation);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:presentation_id",
  validatorHandler(deletePresentationSchema, "params"),
  async (req, res, next) => {
    try {
      const deletedPresentation = await deletePresentation(
        Number(req.params.presentation_id)
      );

      res.json(deletedPresentation);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
