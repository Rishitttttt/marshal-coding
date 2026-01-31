import prisma from "./src/config/db.js";
import bcrypt from "bcrypt";

async function main() {
  try {
    // Create a test user
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const user = await prisma.user.create({
      data: {
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
      },
    });

    console.log("Test user created:", user);
  } catch (error) {
    if (error.code === "P2002") {
      console.log("User already exists");
    } else {
      console.error("Error seeding database:", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
