import { prisma } from "../database.js";

async function searchByDiscipline(textInput: string) {
    return prisma.discipline.findMany({
        where: {
            name: {
                contains: textInput
            }
        },
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
    })
}

export default { 
    searchByDiscipline,
};