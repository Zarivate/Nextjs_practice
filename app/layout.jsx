import "@styles/global.css";

import React from "react";

export const metadata = {
  title: "Example",
  description: "This is just an example text. Pay it no mind.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
