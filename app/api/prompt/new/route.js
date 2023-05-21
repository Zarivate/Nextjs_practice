import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  // Grab what is passed through POST request
  const { userId, prompt, tag } = await req.json();

  // Connect to MongoDB
  try {
    // Because connecToDB is a lambda function, it dies every time it finishes and thus
    // has to be called again when want to connect to the database.
    await connectToDB();
    // Create the new prompt using the imported Prompt model with the retrieved POST data values
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    // Save prompt to database
    await newPrompt.save();

    // Return a JSON version of the prompt
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create the post", { status: 500 });
  }
};
