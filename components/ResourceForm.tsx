import { Resource } from "@/pages/withAPI_4";
import { useState, FormEvent, MouseEvent } from "react";

const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: 2,
  timeToFinish: 60,
};

export interface ResourceFormProps {
  onFormSubmit (formData: Resource): Promise<void>;
  editData?: Resource;
};

function ResourceForm({ onFormSubmit, editData }: ResourceFormProps) {
  const [form, setForm] = useState<Resource>(editData || DEFAULT_DATA);

  function handleChange(
    event: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.currentTarget;

    setForm({
      ...form,
      [name]: name === "timeToFinish" ? +value : value,
    });
  }

  function resetForm(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setForm(DEFAULT_DATA);
  }

  return (
    <div className="resource-form">
      <h1 className="title">{editData ? 'Edit' : 'Add a new '}  resource</h1>
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              value={form.title}
              name="title"
              onChange={handleChange}
              className="input"
              type="text"
              placeholder="Learn Next JS and Sanity IO"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              value={form.description}
              name="description"
              onChange={handleChange}
              className="textarea"
              placeholder="Learn these technologies because they are very popular and better SEO"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Link</label>
          <div className="control">
            <input
              value={form.link}
              onChange={handleChange}
              name="link"
              className="input"
              type="text"
              placeholder="https://academy.eincode.com"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Priority</label>
          <div className="control">
            <div className="select">
              <select
                value={form.priority}
                name="priority"
                onChange={handleChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Time to finish</label>
          <div className="control">
            <input
              value={form.timeToFinish}
              name="timeToFinish"
              onChange={handleChange}
              className="input"
              type="number"
              placeholder="60"
            />
          </div>
          <p className="help">Time is in minutes</p>
        </div>
        <div className="field is-grouped">
          <div className="control">
            {/* 
              For the form we do not use onSubmit in form tag in this scenario 
              that type is "button", not "submit"

              Then the browser refresh will not happen.
            */}
            <button
              type="button"
              onClick={() => onFormSubmit(form)}
              className="button is-link">
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={resetForm}>
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
