import { io } from "socket.io-client";

// connect to backend
const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);

  // join dummy problem room for now
  socket.emit("join_problem", "problem-123");

  // send dummy message for now (userId will be fixed later)
  socket.emit("send_message", {
    problemId: "problem-123",
    userId: "TEMP_USER_ID",
    content: "Test message before Postman setup",
  });
});

socket.on("receive_message", (message) => {
  console.log("📩 Message received:", message);
});
