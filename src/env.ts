import { cleanEnv, num, str, bool } from "envalid";
import "dotenv/config";

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  SITE_NAME: str({ default: "Dzation" }),
  SITE_URL: str({ default: "http://localhost" }),

  JWT_SECRET: str({ default: "ilk2" }),
});

export default env;
