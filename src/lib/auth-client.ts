import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";
import { reactStartCookies } from "better-auth/react-start";


export const authClient = createAuthClient({
  plugins: [anonymousClient(), reactStartCookies()],
});
