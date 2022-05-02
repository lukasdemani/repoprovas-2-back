import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const testRouter = Router();

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
//testRouter.post("/tests/add", ensureAuthenticatedMiddleware, validateSchemaMiddleware(testSchema), testeController.newTest)

export default testRouter;
