import { ParsedUrlQuery } from "querystring";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { Resource } from "@/pages/withAPI_4";
import ResourceForm from "@/components/ResourceForm";
import Layout from "@/components/Layout";

interface IParams extends ParsedUrlQuery {
  id: string;
}

function ResourceEdit(this: any, 
  { resource }: InferGetServerSidePropsType<typeof getServerSideProps>
) {

  async function updateResource (formData: Resource) {
    alert(JSON.stringify(formData));
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
    const resource = await (
      await fetch(`http://localhost:3001/api/resources/${id}`)
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