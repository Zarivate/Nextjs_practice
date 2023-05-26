// Route file to handle editing and deleting user posts

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET call to read/retrieve prompt in question, because [id] is a dynamic variable,
// it can be accessed within params
export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Filter out the prompt in question by it's id
    const prompt = await Prompt.findById(params.id).populate("creator");

    // If prompt isn't found return error response
    if (!prompt) {
      return new Response("Prompt was not found", { status: 404 });
    }

    // Return the data
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};

// PATCH request for editing the prompt
export const PATCH = async (request, { params }) => {
  // Retrieve data passed in to update the prompt
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Filter out the current prompt by it's id
    const existingPrompt = await Prompt.findById(params.id);

    // If there is no existing prompt, then return an error message
    if (!existingPrompt) {
      return new Response("Prompt does not exist", { status: 404 });
    }

    // If the prompt does exists, then update it and it's tags to be equal to
    // the one passed in through params
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // Once updated, just await for it to save in the DB
    await existingPrompt.save();

    // Return a successful response
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// Delete request to remove a post
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt has been deleted", { status: 200 });
  } catch (error) {
    return new Response("Prompt failed to be deleted", { status: 500 });
  }
};
