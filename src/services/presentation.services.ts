import prisma from "../db/config/prisma.config";
import { Presentation, PresentationPayload } from "../types";

export const getPresentations = async () => {
  const presentations = await prisma.presentation.findMany({
    where: {
      is_deleted: false,
    },
  });
  return presentations;
};

export const getPresentation = async (presentation_id: number) => {
  const presentation = await prisma.presentation.findUnique({
    where: {
      presentation_id: presentation_id,
    },
  });
  return presentation;
};

export const createPresentation = async (presentation: Presentation) => {
  const newPresentation = await prisma.presentation.create({
    data: {
      ...presentation,
    },
  });
  return newPresentation;
};

export const updatePresentation = async (
  presentation_id: number,
  payload: PresentationPayload
) => {
  const updatedPresentation = await prisma.presentation.update({
    where: {
      presentation_id: presentation_id,
    },
    data: {
      ...payload,
    },
  });
  return updatedPresentation;
};

export const deletePresentation = async (presentation_id: number) => {
  const deletedPresentation = await prisma.presentation.update({
    where: {
      presentation_id: presentation_id,
    },
    data: {
      is_deleted: true,
    },
  });
  return deletedPresentation;
};
