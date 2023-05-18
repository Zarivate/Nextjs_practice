import "@styles/globals.css";
// So that the navbar can be reused across all the pages, it's imported here
import Nav from "@components/Nav";
import Provider from "@components/Provider";

import React from "react";

export const metadata = {
  title: "Example",
  description: "This is just an example text. Pay it no mind.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
