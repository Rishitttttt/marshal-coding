const normalizeOrigin = (value) => {
  if (!value) return null;
  return value.replace(/\/$/, "");
};

export const getAllowedOrigins = () => {
  const configuredOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN,
  ]
    .flatMap((value) => (value ? value.split(",") : []))
    .map((value) => normalizeOrigin(value.trim()))
    .filter(Boolean);

  return Array.from(new Set(configuredOrigins));
};

export const isAllowedOrigin = (origin) => {
  const normalizedOrigin = normalizeOrigin(origin);

  if (!normalizedOrigin) {
    return true;
  }

  return getAllowedOrigins().includes(normalizedOrigin);
};
