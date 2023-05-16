// Component to display and build the navigation bar

// Also since are using React hooks to display things on the client side, component needs to be marked as client side
"use client";

import React, { useState, useEffect } from "react";
// Link used to navigate from page to page
import Link from "next/link";
// Image used to automatically optimized any used images in the project
import Image from "next/image";
// Util functions to help make signing up and signing in/out easier
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Main Logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>
    </nav>
  );
};

export default Nav;
