// Component that shows the live feed, if any, to the user

"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// Component that has a list of all the prompts
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {/* Map over data and display prompts */}
      {data.map((post) => (
        // For each post, it's data will be represented through a PromptCard component
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // State to handle text searches
  const [searchText, setSearchText] = useState("");

  // State to handle the posts
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    console.log("handleSearchChange function called");
  };

  // Call to get the data to display in Feed
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tog or username"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
