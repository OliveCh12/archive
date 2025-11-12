import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins";
import { DatabaseSync } from "node:sqlite";
import { reactStartCookies } from "better-auth/react-start";

export const auth = betterAuth({
  database: new DatabaseSync("database.sqlite"),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    anonymous(),
    reactStartCookies(),
  ],
});
