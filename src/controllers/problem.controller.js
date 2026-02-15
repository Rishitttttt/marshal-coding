import prisma from "../config/db.js";

// Get problems by topic
export const getProblemsByTopic = async (req, res) => {
  const { topicId } = req.params;
  const userId = req.user.userId;

  try {
    const problems = await prisma.problem.findMany({
      where: { topicId },
      include: {
        solvedBy: {
          where: { userId },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const formatted = problems.map((problem) => ({
      id: problem.id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      link: problem.link,
      createdAt: problem.createdAt,
      isSolved: problem.solvedBy.length > 0,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("PROBLEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single problem
export const getProblemById = async (req, res) => {
  const { problemId } = req.params;
  const userId = req.user.userId;

  try {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        solvedBy: {
          where: { userId },
        },
      },
    });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const userData = problem.solvedBy[0] || null;

    res.json({
      ...problem,
      notes: userData?.notes || "",
      isSolved: !!userData,
    });

  } catch (error) {
    console.error("GET PROBLEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

