"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  // Get the router
  const router = useRouter();
  // Get the url parameters of the page, will be used to get the unique post id
  const searchParams = useSearchParams();

  // Get the unique post id
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      // Get the prompt details using the route we created
      const response = await fetch(`/api/prompt/${promptId}`);

      const data = await response.json();

      // Set the post to be the retrieved data
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    // Function will only be called if the promptId actually exists
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  // Function to handle updating the prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Check to make sure there is a promptId
    if (!promptId) {
      return alert("Prompt ID doesn't exist!");
    }

    // Attempt to update the post
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      // If the response comes through fine, push it through
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Either way if the post is successful or not, will want to set the submit state to false
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
