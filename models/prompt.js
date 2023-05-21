import { Schema, model, models } from "mongoose";

// Function to create new schema in the database from what
// the user wants to post.
const PromptSchema = new Schema({
  creator: {
    // Creator will be a document of type user
    type: Schema.Types.ObjectId,
    // Will be a 1 to many relationship where 1 user can make many prompts
    ref: "User",
  },
  // User prompt will be of type string and be required
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag(s) are required"],
  },
});

// Same as before, prompt will either be an existing model called "Prompt"
// or will use a newly created model called "Prompt" based on the
// "PromptSchema" above if doesn't already exist.
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
