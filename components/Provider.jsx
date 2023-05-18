// Because program makes use of the client's browser capabilities, have to set it to the 'use client' directive
"use client";

import React from "react";

import { SessionProvider } from "next-auth/react";

// Higher order function so other components will be wrapped with it, meaning children are rendered within
const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
