import { ParsedUrlQuery } from "querystring";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { Resource } from "@/pages/withAPI_4";
import ResourceForm from "@/components/ResourceForm";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

interface IParams extends ParsedUrlQuery {
  id: string;
}

function ResourceEdit(this: any, 
  { resource }: InferGetServerSidePropsType<typeof getServerSideProps>
) {

  const router = useRouter();

  async function updateResource (formData: Resource) {   
    try {
      const res = await fetch('/api/resources/', {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Something strange thing happened during the update.");
      }

      const responseText = await res.text();

      alert(responseText);

      router.push("/withAPI_4");
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm
              onFormSubmit={updateResource.bind(this)}
              editData={resource}
            />
          </div>
        </div>
      </div>

    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  resource: Resource;
}> = async ({ params }) => {
  const { id } = params as IParams;

  try {
    const resource = await(
      await fetch(`${process.env.API_URL}/resources/${id}`)
    ).json();

    if (!resource) {
      throw new Error("Unable to get the requested resource.");
    }

    return {
      props: {
        resource,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default ResourceEdit;