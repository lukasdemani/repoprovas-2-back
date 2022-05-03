import { prisma } from "../database.js";

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function insert(name: string, pdfUrl: string, categoryId: number, teacherDisciplineId: number) {
  return prisma.test.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId
    }
  })
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  insert,
};
