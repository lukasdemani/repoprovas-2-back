import { prisma } from "../database.js";
import { CreateUserData } from "../services/userService.js";

async function insert(teacherId: number, disciplineId: number) {
    return prisma.teacherDiscipline.create({
      data: { teacherId,
              disciplineId,
      }
    });
  }

  async function getTeacherDisciplineId(teacherId: number, disciplineId: number) {
      return prisma.teacherDiscipline.findMany({
          where: {
              teacherId : teacherId ,
              disciplineId: disciplineId ,
          },
          select: {
              id: true
          }
      })
  }

  export default {
    insert,
    getTeacherDisciplineId
  };
  