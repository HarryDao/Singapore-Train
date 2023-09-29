export * from "./general";
export * from "./map";
export * from "./mrt";
export * from "./files";

export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:3201";

export const STATIC_FILE_SERVER_URL = ""; // i.e: s3 url, leave empty to use get files from public folder
