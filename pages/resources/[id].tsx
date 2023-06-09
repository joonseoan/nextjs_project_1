import Layout from "@/components/Layout";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Resource } from "../withAPI_4";

function ResourceDetail(
  { resource: { title, description, createdAt } }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // console.log('resourceId: ', resourceId)
  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">{createdAt || 'December 24, 2023'}</h2>
                    <h1 className="title">{ title }</h1>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{ resource: Resource }> = async ({ params, query }) => {
  // [IMPORTANT]
  // param is more useful
  /**
   * url: http://localhost:3000/resources/adfasdfdfadfaf?joon=23
   * => { joon: '2', id: 'adfasdfdfadfaf' }
   */
  // const id = query.id as string;
  // console.log("query: ", query);

  // [IMPORTANT]
  // [Params works like  this]
  // `param` works only with a single attribute

  const id = (params!.id) as string;
  
  try {
    const resource = await (await fetch(`http://localhost:3001/api/resources/${id}`)).json();

    if (!resource) {
      throw new Error('Unable to get the requested resource.');
    }

    return {
      props: {
        resource,
      },
    };
  } catch(err) {
    return {
      notFound: true,
    }
  }  
}

export default ResourceDetail;
