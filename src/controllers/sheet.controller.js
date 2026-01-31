import prisma from "../config/db.js";

/**
 * Create a new sheet
 */
export const createSheet = async (req, res) => {
  try {
    const { title, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: "Title and type are required" });
    }

    const sheet = await prisma.sheet.create({
      data: {
        title,
        type,
      },
    });

    res.status(201).json(sheet);
  } catch (error) {
    console.error("CREATE SHEET ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get all sheets
 */
export const getSheets = async (req, res) => {
  try {
    const sheets = await prisma.sheet.findMany();
    res.json(sheets);
  } catch (error) {
    console.error("GET SHEETS ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
