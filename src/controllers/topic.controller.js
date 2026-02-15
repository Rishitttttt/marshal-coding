import prisma from "../config/db.js";

export const getTopicsBySheet = async (req, res) => {
  const { sheetId } = req.params;
  const userId = req.user.userId; // IMPORTANT

  try {
    const topics = await prisma.topic.findMany({
      where: { sheetId },
      include: {
        problems: {
          include: {
            solvedBy: {
              where: { userId },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const formattedTopics = topics.map((topic) => {
      const total = topic.problems.length;
      const solved = topic.problems.filter(
        (p) => p.solvedBy.length > 0
      ).length;

      return {
        id: topic.id,
        name: topic.name,
        sheetId: topic.sheetId,
        totalProblems: total,
        solvedProblems: solved,
      };
    });

    res.json(formattedTopics);
  } catch (error) {
    console.error("TOPIC ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
