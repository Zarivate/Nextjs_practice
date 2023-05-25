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
  const { prompt, tag } = await request.json();

  try {
  } catch (error) {}
};
