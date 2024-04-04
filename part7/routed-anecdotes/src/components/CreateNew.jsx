import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("");
  const author = useField("");
  const info = useField("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
