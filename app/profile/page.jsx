// Handles user profile page
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  // Intialize router
  const router = useRouter();

  // User session
  const { data: session } = useSession();

  const [userPosts, setUserPosts] = useState([]);

  // Call to get only the posts corresponding to the user
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    console.log(userPosts);

    // Only fetch the session if the session user id exists for the select user
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    // Make sure user wants to delete post
    const confirmed = confirm("Are you sure you want to delete this?");

    // If user is sure, make a call to delete the post
    if (confirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        // Filter out the delete post from the rest of the posts
        const filteredPosts = userPosts.filter((p) => p._id !== post._id);

        setUserPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
