import testRepository from "../repositories/testRepository.js";
import teachersDisciplinesRepository from "../repositories/teachersDisciplines.js";
import disciplineRepository from "../repositories/disciplineRepository.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
}

export type AddTestData = {
  name: string,
  pdfUrl: string,
  categoryId: number,
  disciplineId: number,
  teacherId: number
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}

async function newTest(testData: AddTestData) {
  await teachersDisciplinesRepository.insert(testData.teacherId, testData.disciplineId);
  const teacherDisciplineId = await teachersDisciplinesRepository.getTeacherDisciplineId(testData.teacherId, testData.disciplineId);
  await testRepository.insert(testData.name, testData.pdfUrl, testData.categoryId, teacherDisciplineId[0].id);
}

async function searchByDiscipline(textInput: string) {
  return disciplineRepository.searchByDiscipline(textInput);
}

export default {
  find,
  newTest,
  searchByDiscipline
};
