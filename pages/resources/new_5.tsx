import Layout from "@/components/Layout";

/**
 * Regarding for link, please refer to NavBar in components.
 * We can use <a href="/resources/new_5" />. However,
 * it refreshes the browser. We would need to implement the link
 * in a different way.
 *
 */

function ResourceCreate() {
  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="resource-form">
              <h1 className="title">Add a new resource</h1>
              <form>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Text input"
                    />
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
