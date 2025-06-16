import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  AUTH_SECRET: str(),
  AUTH_GOOGLE_ID: str(),
  AUTH_GOOGLE_SECRET: str(),
  DATABASE_URL: str(),
  DIRECT_URL: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  CLOUDINARY_FOLDER: str(),
});

export default env;
