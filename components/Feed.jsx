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
  // State to handle all posts
  const [posts, setPosts] = useState([]);

  // State to handle user specific searched posts
  const [searchText, setSearchText] = useState("");

  // State to handle populating what's returned from filtering for what the user typed in
  const [searchedResults, setSearchedResults] = useState([]);

  // State to handle timeout for returning user searched posts
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Use effect to show all posts available on the screen
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // Function to handle filtering posts
  const filterPrompts = (searchtext) => {
    // Using a regular expression to try and find matches for what the user searched for, with the "i"
    // flag so it's not case-sensitive.
    const regex = new RegExp(searchtext, "i");

    // Filter through all the posts, looking for any matches between the regex, which now holds the user searched text,
    // and current post's username, tag, and or prompt
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce so isn't called every single time a change is detected with what a user types in. Instead
    // is only called after small delay where hopefully the user finishes typing in what they want by then.
    setSearchTimeout(
      setTimeout(() => {
        // Call the filter prompts function using the passed in user searched text and save result in searchResult variable
        const searchResult = filterPrompts(e.target.value);

        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Function to handle when a user clicks on a tag
  const tagSearch = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {/* This is to handle showing all the prompts */}
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={tagSearch} />
      ) : (
        <PromptCardList data={posts} handleTagClick={tagSearch} />
      )}
    </section>
  );
};

export default Feed;
