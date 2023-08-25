// [IMPORTANT]
// [id] folder containing index.tsx is the same way of creating `[id].tsx` file

import Layout from "@/components/Layout";
import {
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";

import { ParsedUrlQuery } from "querystring";

import { Resource, WithAPIProps } from "../../withAPI_4";
import Link from "next/link";
import ResourceLabel from "@/components/ResourceLabel";
import { useEffect, useState } from "react";

interface IParams extends ParsedUrlQuery {
  id: string;
}

export type ResourceProp = InferGetServerSidePropsType<typeof getServerSideProps>;

function ResourceDetail({ resource: _resource, isResourceActive = undefined, setIsResourceActive = undefined }: WithAPIProps & ResourceProp) {
  const [resource, setResource] = useState<Resource>(_resource);
  const { title, description, createdAt, id, timeToFinish, status } = resource;

  useEffect(() => {
    (async function() {
      setResource(await(
        await fetch(`http://localhost:3001/api/resources/${id}`)
      ).json());
    })()

  }, [isResourceActive, id]);

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

      if (setIsResourceActive) {
        setIsResourceActive(true);
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return (
    <Layout setIsResourceActive={setIsResourceActive} isResourceActive={isResourceActive}>
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
                    {!isResourceActive && (
                      <>
                        <button
                          className="button is-success ml-1"
                          onClick={activateResource}>
                          Activate
                        </button>
                      </>
                    )}
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