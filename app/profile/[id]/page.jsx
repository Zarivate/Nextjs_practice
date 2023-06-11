"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  // Get the current URL's query string
  const searchParams = useSearchParams();

  // Get the username from the query string
  const userName = searchParams.get("name");

  // State to handle populating user's posts
  const [userPosts, setUserPosts] = useState([]);

  // At the start make an API call to get the specific user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    // If a user id exists within the passed in params, call fetchPosts()
    if (params?.id) fetchPosts();
    // Call the use Effect again if there is ever a change in the ids
  }, [params.id]);

  // Return a display of the user's profile page using their specific details
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
