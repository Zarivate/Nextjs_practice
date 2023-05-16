import Feed from "@components/Feed";

import React from "react";

const Home = () => {
  return (
    // Set so the elements use the entire width of the screen and fall vertically
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Howdy
        {/* The break is hidden on bigger devices but the content is broken up if the screen is on the smaller side */}
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Inspired</span>
      </h1>
      <p className="desc text-center">
        This site is an example of what can be done with the power of Next JS 13
      </p>
      <Feed />
    </section>
  );
};

export default Home;
