import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import ResourceForm from "@/components/ResourceForm";
import { Resource } from "../withAPI_4";

/**
 * Regarding for link, please refer to NavBar in components.
 * We can use <a href="/resources/new_5" />. However,
 * it refreshes the browser. We would need to implement the link
 * in a different way.
 */

function ResourceCreate(this: any) {
  const router = useRouter();

  async function createForm(formData: Resource) {
    console.log("formData: ", formData);
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Something strange thing happened.");
      }

      router.push("/withAPI_4");
    } catch (err) {
      throw new Error((err as Error).message);
    }

    // we do not need to add localhost because it is the same host domain.
  }

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm onFormSubmit={createForm.bind(this)} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ResourceCreate;
