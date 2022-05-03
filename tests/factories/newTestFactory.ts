import { faker } from "@faker-js/faker";
import { AddTestData } from "../../src/services/testService";

export default function newTestFactory(): AddTestData {
  return {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
}