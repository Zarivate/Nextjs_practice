// User model for creating a user and adding it to the database
import { Schema, model, models } from "mongoose";

// User schema
const UserSchema = newSchema({
  email: {
    type: String,
    // Has to be unique, otherwise print out that email isn't unique
    unique: [true, "Email already exists."],
    required: [true, "Email is required."],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// Check to see if a User model already exists within the "models" object, if so then use that one for the variable.
// Otherwise, "model" function is called to create a new model and assigend to the User variable.

const User = models.User || model("User", UserSchema);

export default User;
