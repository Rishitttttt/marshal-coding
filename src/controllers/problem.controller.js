import prisma from "../config/db.js";

export const createProblem = async (req, res) => {
  const { title, description, difficulty, sheetId } = req.body;

  const problem = await prisma.problem.create({
    data: { title, description, difficulty, sheetId },
  });

  res.status(201).json(problem);
};

export const getProblemsBySheet = async (req, res) => {
  const { sheetId } = req.params;

  const problems = await prisma.problem.findMany({
    where: { sheetId },
  });

  res.json(problems);
};
