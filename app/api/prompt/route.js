// File to create api route for retrieval of the user posts
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    // Connect to the database
    await connectToDB();

    // Filter out just the prompts alongside their creators
    const prompts = await Prompt.find({}).populate("creator");

    // Return the data
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};
