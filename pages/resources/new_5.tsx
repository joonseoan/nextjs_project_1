import Layout from "@/components/Layout";
import { FormEvent, useState } from "react";

/**
 * Regarding for link, please refer to NavBar in components.
 * We can use <a href="/resources/new_5" />. However,
 * it refreshes the browser. We would need to implement the link
 * in a different way.
 */

export interface DefaultData {
  title: string;
  description: string;
  link: string;
  priority: string;
  timeToFinish: number;
}

const DEFAULT_DATA = {
  title: '',
  description: '',
  link: '',
  priority: '2',
  timeToFinish: 60,
};


function ResourceCreate() {
  const [form, setForm] = useState<DefaultData>(DEFAULT_DATA);

  function submitForm() {
    alert(JSON.stringify(form))
  }

  function handleChange(
    event:FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.currentTarget;
    

    setForm({
      ...form,
      [name]: name === 'timeToFinish' ? +value : value,
    });
  }

  function resetForm () {
    setForm(DEFAULT_DATA);
  }

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="resource-form">
              <h1 className="title">Add a new resource</h1>
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
                      <select value={form.priority} name="priority" onChange={handleChange}>
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
                      onClick={submitForm}
                      className="button is-link">
                      Submit
                    </button>
                  </div>
                  <div className="control">
                    <button className="button is-link is-light" onClick={resetForm}>Reset Form</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ResourceCreate;
