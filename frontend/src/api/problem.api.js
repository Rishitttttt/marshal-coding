import api from "./axios.js";

export const getProblemsByTopic = async (topicId) => {
  const res = await api.get(`/topics/${topicId}/problems`);
  return res.data;
};

export const getProblemById = async (problemId) => {
  const res = await api.get(`/problems/${problemId}`);
  return res.data;
};

export const markProblemSolved = async (problemId) => {
  const res = await api.post("/progress/solve", { problemId });
  return res.data;
};

export const unmarkProblemSolved = async (problemId) => {
  const res = await api.post("/progress/unsolve", { problemId });
  return res.data;
};

export const getProblemMessages = async (problemId, params = {}) => {
  const res = await api.get(`/messages/problem/${problemId}`, { params });
  return res.data;
};

export const saveProblemNotes = async (problemId, notes) => {
  const res = await api.post("/progress/notes", { problemId, notes });
  return res.data;
};
