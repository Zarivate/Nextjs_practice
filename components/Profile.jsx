import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit(post)} //called ONLY when the button is clicked, and it will receive the correct post object as its argument.
            handleDelete={() => handleDelete(post)} //called ONLY when the button is clicked, and it will receive the correct post object as its argument.
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
