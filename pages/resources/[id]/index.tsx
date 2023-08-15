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
import ResourceLabel from "@/components/ResourceLabel";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IParams extends ParsedUrlQuery {
  id: string;
}

function ResourceDetail({ resource }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { title, description, createdAt, id, timeToFinish, status } = resource;
  // const { hasActiveResource = false } = router.query;

  // useEffect(() => {
    
  // }, []);
  console.log('status: ', status)
  // console.log('hasActiveResource in detail page: ', hasActiveResource)

  async function activateResource() {
    try {
      const res = await fetch("/api/resources/", {
        method: "PATCH",
        body: JSON.stringify({
          ...resource,
          status: 'active',
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Something strange thing happened during the activation.");
      }

      location.reload();

      // alert(await res.text());
      // router.push("/withAPI_4");
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

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
                      {createdAt
                        ? new Date(createdAt).toDateString()
                        : "Wen Dec 24, 2023"}
                      <ResourceLabel status={status} />
                    </h2>
                    <h1 className="title">{title}</h1>
                    <p>{description}</p>
                    <p>Time to finish: {timeToFinish} min</p>
                    {/* 
                      [IMPORTANT!!!]
                      As long as we use button here for edit page
                      we need to use `getServerSideProps`
                    */}
                    {status === "inactive" && (
                      <>
                        <Link
                          href={`/resources/${id}/edit`}
                          className="button is-warning">
                          Update
                        </Link>
                      </>
                    )}
                    {/* {hasActiveResource && ( */}
                      <>
                        <button
                          className="button is-success ml-1"
                          onClick={activateResource}>
                          Activate
                        </button>
                      </>
                    {/* )} */}
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

export default ResourceDetail;