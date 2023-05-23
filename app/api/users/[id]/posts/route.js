// File to handle retrieving only specific user posts via id
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Since route has a dynamic variable, id, {params} is used
export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Filter out the prompts of only the creator passed in
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

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
