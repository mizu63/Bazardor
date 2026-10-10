// import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
  
//     baseURL: process.env.BETTER_AUTH_URL
// })




// export const { signIn, signUp, useSession } =  authClient;
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signIn, signUp, useSession } = authClient;