// Component to display and build the navigation bar

// Also since are using React hooks to display things on the client side or are just using some sort of client side functionality,
// component needs to be marked as client side with the "use client" directive.
"use client";

import React, { useState, useEffect } from "react";

// Link used to navigate from page to page
import Link from "next/link";

// Image used to automatically optimized any used images in the project
import Image from "next/image";

// Util functions to help make signing up and signing in/out easier
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // Providers to be used to sign users in and out
  const [providers, setProviders] = useState(null);

  // State to handle display of drop down menu
  const [toggleDropDown, setToggleDropDown] = useState(false);

  // Hook to set the providers at the start of the program
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setProviders();
  }, []);

  // Dummy variable to test out components/buttons that appear to logged in users
  const isLoggedIn = true;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* Main logo image will send user to the route/home screen if clicked on */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Main Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        {/* The classname here utilizes a style that makes it so the paragraph doesn't appear on smaller screens */}
        <p className="logo_text">Site title</p>
      </Link>
      {/* The code below this comment mainly deals with desktop users, will normally be hidden to any other users with smaller screen sizes.
      The sm:flex makes it visible to only users with small screens while hidden makes it normally not appear otherwise. So put together
      would make it the content is invisible to only users with larger screen sizes.*/}
      <div className="sm:flex hidden">
        {/* What's displayed depends on whether the user is logged in or not */}
        {isLoggedIn ? (
          // For any device larger than small, medium and above, will be able to see the button
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Make Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* If have access to providers, then map over them and return a button for each one. In the case of this program 
            only the Google provider will bt used. */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* The code below deals mainly with mobile user navigation */}
      <div className="sm:hidden flex relative">
        {isLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Post
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* If have access to providers, then map over them and return a button for each one. In the case of this program 
            only the Google provider will bt used. */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
