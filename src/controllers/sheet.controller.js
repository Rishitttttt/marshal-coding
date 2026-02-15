import prisma from "../config/db.js";

/* ================= CREATE SHEET ================= */
export const createSheet = async (req, res) => {
  try {
    const { title, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: "Title and type are required" });
    }

    const normalizedType = type.toUpperCase();

    if (!["PATTERN", "REVISION", "COMPANY"].includes(normalizedType)) {
      return res.status(400).json({
        message: "Invalid sheet type. Must be PATTERN | REVISION | COMPANY",
      });
    }

    const sheet = await prisma.sheet.create({
      data: {
        title,
        type: normalizedType, // ✅ ENUM SAFE
      },
    });

    res.status(201).json(sheet);
  } catch (error) {
    console.error("CREATE SHEET ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= GET ALL SHEETS ================= */
export const getSheets = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    const sheets = await prisma.sheet.findMany({
      where: {
        type: "PATTERN", // ✅ ENUM CORRECT
      },
      include: {
        topics: {
          include: {
            problems: {
              include: {
                solvedBy: {
                  where: { userId },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const formatted = sheets.map((sheet) => {
      let total = 0;
      let solved = 0;

      sheet.topics.forEach((topic) => {
        total += topic.problems.length;

        topic.problems.forEach((problem) => {
          if (problem.solvedBy.length > 0) {
            solved++;
          }
        });
      });

      return {
        id: sheet.id,
        title: sheet.title,
        type: sheet.type,
        totalProblems: total,
        solvedProblems: solved,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error("GET SHEETS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SHEET BY ID ================= */
export const getSheetById = async (req, res) => {
  try {
    const { id } = req.params;

    const sheet = await prisma.sheet.findUnique({
      where: { id },
      include: {
        topics: {
          include: {
            problems: true,
          },
        },
      },
    });

    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    res.status(200).json(sheet);
  } catch (error) {
    console.error("GET SHEET BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= RESUME PROBLEM ================= */
export const getResumeProblem = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    const sheet = await prisma.sheet.findFirst({
      where: { type: "PATTERN" }, // ✅ ENUM CORRECT
      include: {
        topics: {
          include: {
            problems: {
              include: {
                solvedBy: {
                  where: { userId },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!sheet) {
      return res.json(null);
    }

    for (const topic of sheet.topics) {
      for (const problem of topic.problems) {
        if (problem.solvedBy.length === 0) {
          return res.json({
            topicId: topic.id,
            topicName: topic.name,
            problemId: problem.id,
            problemTitle: problem.title,
          });
        }
      }
    }

    return res.json({ message: "All problems completed 🎉" });
  } catch (error) {
    console.error("RESUME ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
