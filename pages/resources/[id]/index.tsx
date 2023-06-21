// [IMPORTANT]
// [id] folder containing index.tsx is the same way of creating `[id].tsx` file

import Layout from "@/components/Layout";
import {
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";

import { ParsedUrlQuery } from "querystring";

import { Resource } from "../../withAPI_4";
import Link from "next/link";

interface IParams extends ParsedUrlQuery {
  id: string;
}

function ResourceDetail({
  resource: { title, description, createdAt, id },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">
                      {createdAt || "December 24, 2023"}
                    </h2>
                    <h1 className="title">{title}</h1>
                    <p>{description}</p>
                    {/* 
                      [IMPORTANT!!!]
                      As long as we use button here for edit page
                      we need to use `getServerSideProps`
                    */}
                    <Link href={`/resources/${id}/edit`} className="button is-warning">
                      Update
                    </Link>
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

export const getServerSideProps: GetServerSideProps<{
  resource: Resource;
}> = async ({ params, query }) => {
  // [IMPORTANT]
  // query is more useful
  /**
   * url: http://localhost:3000/resources/adfasdfdfadfaf?joon=23
   * => { joon: '23', id: 'adfasdfdfadfaf' }
   */
  // const id = query.id as string;
  // const { id } = query as IParams;

  // [IMPORTANT]
  // [Params works like  this]
  // `param` works only with a single attribute
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

export default ResourceDetail;