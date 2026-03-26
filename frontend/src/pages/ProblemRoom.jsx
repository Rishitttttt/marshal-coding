import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProblemById,
  getProblemMessages,
  saveProblemNotes,
} from "../api/problem.api.js";
import { getSocket } from "../socket/socket.js";
import Layout from "../components/Layout.jsx";

function ProblemRoom() {
  const { problemId } = useParams();

  const [problem, setProblem] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  const messagesEndRef = useRef(null);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(problemId);
        setProblem(data);
        setNotes(data.notes || "");
      } catch (err) {
        console.error("Fetch problem error:", err);
      }
    };

    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getProblemMessages(problemId);
        setMessages(data.messages);
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };

    fetchMessages();
  }, [problemId]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("join_problem", { problemId });

    socket.on("presence_update", (data) => {
      if (data.problemId === problemId) {
        setOnlineUsers(data.users);
      }
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("user_typing", (data) => {
      if (data.userId !== currentUserId) {
        setTypingUser("Someone");
        setTimeout(() => setTypingUser(null), 1500);
      }
    });

    return () => {
      socket.emit("leave_problem", { problemId });
      socket.off("presence_update");
      socket.off("receive_message");
      socket.off("user_typing");
    };
  }, [problemId, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const socket = getSocket();
    socket.emit("send_message", {
      problemId,
      content: newMessage,
    });

    setNewMessage("");
  };

  if (!problem) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">{problem.title}</h2>
        <p className="text-slate-400 mb-4">
          Difficulty: {problem.difficulty}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => window.open(problem.link, "_blank")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition"
          >
            Solve
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className="px-5 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition"
          >
            {showNotes ? "Hide Notes" : "Show Notes"}
          </button>
        </div>

        {showNotes && (
          <div className="mb-8">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Write your notes here..."
              className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 focus:border-green-500 outline-none min-h-[120px]"
            />

            <button
              onClick={async () => {
                try {
                  await saveProblemNotes(problemId, notes);
                  alert("Notes saved");
                } catch (err) {
                  console.error("Save notes error:", err);
                }
              }}
              className="mt-3 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full text-white font-semibold transition"
            >
              Save Notes
            </button>
          </div>
        )}

        <div className="mt-10 border-t border-slate-800 pt-6">
          <h3 className="text-xl font-semibold mb-4">Discussion</h3>

          <div className="bg-slate-950 p-6 rounded-xl h-[450px] overflow-y-auto space-y-4 border border-slate-800">
            {messages.map((msg) => {
              const isMine = msg.user?.id === currentUserId;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 text-sm ${
                      isMine
                        ? "bg-[#25D366] text-black rounded-2xl rounded-bl-sm"
                        : "bg-slate-800 text-white rounded-2xl rounded-br-sm"
                    }`}
                  >
                    {!isMine && (
                      <p className="text-xs font-semibold text-blue-400 mb-1">
                        {msg.user?.username}
                      </p>
                    )}

                    <p>{msg.content}</p>

                    <p className="text-[10px] opacity-60 mt-1 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}

            {typingUser && (
              <p className="text-sm text-slate-400 italic">
                {typingUser} is typing...
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex mt-4 gap-3 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(event) => {
                setNewMessage(event.target.value);
                const socket = getSocket();
                socket.emit("typing", { problemId });
              }}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-slate-900 px-4 py-3 rounded-full outline-none border border-slate-700 focus:border-green-500 transition"
            />

            <button
              onClick={handleSend}
              className="bg-[#25D366] hover:bg-green-600 text-black px-6 py-3 rounded-full font-semibold transition"
            >
              Send
            </button>
          </div>

          <p className="text-slate-500 mt-4 text-sm">
            {onlineUsers.length} users online
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ProblemRoom;
