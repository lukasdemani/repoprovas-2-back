import Joi from "joi";
import { AddTestData } from "../services/testService.js";

export const testSchema = Joi.object<AddTestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  categoryId: Joi.number().required(),
  disciplineId: Joi.number().required(),
  teacherId: Joi.number().required(),
});