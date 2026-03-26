import prisma from "../config/db.js";

export const markProblemSolved = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { problemId } = req.body;

    if (!problemId) {
      return res.status(400).json({ message: "problemId is required" });
    }

    const record = await prisma.userProblem.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {
        solved: true,
      },
      create: {
        userId,
        problemId,
        solved: true,
      },
    });

    res.status(201).json(record);
  } catch (error) {
    console.error("MARK SOLVED ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const unmarkProblemSolved = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { problemId } = req.body;

    if (!problemId) {
      return res.status(400).json({ message: "problemId is required" });
    }

    await prisma.userProblem.deleteMany({
      where: {
        userId,
        problemId,
      },
    });

    res.status(200).json({ message: "Unmarked successfully" });
  } catch (error) {
    console.error("UNMARK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const saveProblemNotes = async (req, res) => {
  const userId = req.user.userId;
  const { problemId, notes } = req.body;

  try {
    if (!problemId) {
      return res.status(400).json({ message: "problemId is required" });
    }

    const existing = await prisma.userProblem.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
    });

    if (existing) {
      const updated = await prisma.userProblem.update({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        data: {
          notes,
        },
      });

      return res.json(updated);
    }

    const created = await prisma.userProblem.create({
      data: {
        userId,
        problemId,
        notes,
        solved: false,
      },
    });

    return res.json(created);
  } catch (error) {
    console.error("SAVE NOTES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
