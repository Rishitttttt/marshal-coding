import prisma from "../config/db.js";

export const getMessagesByProblem = async (req, res) => {
  const { problemId } = req.params;
  const limit = parseInt(req.query.limit) || 20;
  const cursor = req.query.cursor;

  try {
    const messages = await prisma.message.findMany({
      where: {
        problemId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit + 1,
      ...(cursor && {
        cursor: {
          createdAt: new Date(cursor),
        },
        skip: 1,
      }),
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    let nextCursor = null;

    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem.createdAt;
    }

    res.status(200).json({
      messages,
      nextCursor,
    });
  } catch (err) {
    console.error("❌ Fetch messages error:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
