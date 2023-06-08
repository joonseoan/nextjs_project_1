import Layout from "@/components/Layout";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { Resource } from "../withAPI_4";

function ResourceDetail(
  { title, createdAt, description }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
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

// continue work on it tomorrow
// https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
// export const getServerSideProps: GetServerSideProps<{ resourceId: string }> = async (context) => {
//   const { params } = context; 
  
//   return {
//     props: { 
//       resourceId: params!.id
//     }
//   }
// }

// export async function getServerSideProps(): GetServerSideProps<{}> {
//   return {
//     props: {

//     }
//   }
// }

// export async function getServerSideProps(context): Promise<{
//   props: WithAIPStaticProps;
// }> {
//   /**
//    * [IMPORTANT!!!]
//    * Both, `getServerSideProps` and `getStaticProps` are not bound
//    * to localhost:3000. Only the client (React) side is using localhost:3000 server.
//    * Therefore, it does not generate `CORS` error. However, in the client side,
//    * definitely generate the CORS error.
//    */

//   // Direct call for the server outside
//   return {
//     props: {
//       resources: await (
//         await fetch("http://localhost:3001/api/resources")
//       ).json(),
//     },
//   };
// }

export default ResourceDetail;
