import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy } = req.query as { groupBy: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy });
  res.send({ tests });
}

async function newTest(req: Request, res: Response) {
  const testData = req.body;

  await testService.newTest(testData);

  res.send(201)
}

async function searchByDiscipline(req: Request, res: Response){
  const { search } = req.query as { search: string };

  const tests = await testService.searchByDiscipline(search)

  res.send({ tests })
}

export default {
  find,
  newTest,
  searchByDiscipline
};
