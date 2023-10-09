import express from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// Soft delete middleware
const softDelete = app.use(async (req, res, next) => {
  if (req.method === "DELETE") {
    const ingredient_id = Number(req.body.ingredient_id);
    try {
      const updatedIngredient = await prisma.ingredient.update({
        where: {
          ingredient_id: ingredient_id,
        },
        data: {
          deleted_status: true,
          deleted_at: new Date(),
        },
      });
      if (updatedIngredient) {
        res.status(204).end(); // Successfully soft-deleted, return a 204 status
      } else {
        res.status(404).json({error: "Ingredient not found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Internal server error"});
    }
  } else {
    next();
  }
});

export default softDelete;
