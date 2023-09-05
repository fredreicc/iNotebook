import React from "react";
import { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import { useState } from "react";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Personal",
  });

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: note.tag });
    props.showAlert("Added Note Successfully", "success");
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div
        className="container"
        style={{
          fontWeight: "bolder",
        }}
      >
        <h1>Add Notes</h1>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <select
              id="tag"
              name="tag"
              onChange={onChange}
              className="form-select"
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Study">Study</option>
              <option value="Reminder">Reminder</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
