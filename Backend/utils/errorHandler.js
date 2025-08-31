import ApiResponse from "../utils/ApiResponses.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const payload = new ApiResponse(
    status,
    null,
    err.message || "Internal Server Error"
  );
  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
    payload.errors = err.errors || undefined;
  }
  res.status(status).json(payload);
};
