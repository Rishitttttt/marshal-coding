import prisma from "./src/config/db.js";
import bcrypt from "bcrypt";

const patternSheet = {
  title: "Core DSA Patterns",
  type: "PATTERN",
  topics: [
    {
      name: "Sliding Window",
      problems: [
        {
          title: "Maximum Sum Subarray of Size K",
          description:
            "Find the maximum sum of any contiguous subarray of size k.",
          difficulty: "Easy",
          link: "https://leetcode.com/problems/maximum-average-subarray-i/",
        },
        {
          title: "Longest Substring Without Repeating Characters",
          description:
            "Find the length of the longest substring without duplicate characters.",
          difficulty: "Medium",
          link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        },
      ],
    },
    {
      name: "Two Pointers",
      problems: [
        {
          title: "Two Sum II",
          description:
            "Use two pointers on a sorted array to find the target pair.",
          difficulty: "Easy",
          link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        },
        {
          title: "Container With Most Water",
          description:
            "Maximize the area formed by two vertical lines.",
          difficulty: "Medium",
          link: "https://leetcode.com/problems/container-with-most-water/",
        },
      ],
    },
  ],
};

async function seedUser() {
  const existingUser = await prisma.user.findUnique({
    where: { email: "test@example.com" },
  });

  if (existingUser) {
    console.log("Seed user already exists");
    return existingUser;
  }

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    },
  });

  console.log("Seed user created:", user.email);
  return user;
}

async function seedSheets() {
  const existingPatternSheets = await prisma.sheet.count({
    where: { type: "PATTERN" },
  });

  if (existingPatternSheets > 0) {
    console.log("Pattern sheets already exist");
    return;
  }

  await prisma.sheet.create({
    data: {
      title: patternSheet.title,
      type: patternSheet.type,
      topics: {
        create: patternSheet.topics.map((topic) => ({
          name: topic.name,
          problems: {
            create: topic.problems,
          },
        })),
      },
    },
  });

  console.log("Seed sheets created");
}

async function main() {
  try {
    await seedUser();
    await seedSheets();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
