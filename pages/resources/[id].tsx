import Layout from "@/components/Layout";
import { 
  // 2) ServerSideProps
  InferGetServerSidePropsType,
  GetServerSideProps,
  // 1) GetInitialProps
  NextPage,
  NextPageContext,
} from "next";

import { Resource } from "../withAPI_4";

// 1) getInitialProps
export interface Context extends NextPageContext {
  query: {
    id: string;
  }  
};

export interface ResourceDetailProps {
  resource:  Resource;
}

// 2) with `getServerSideProps`
// function ResourceDetail(
//   { resource: { title, description, createdAt } }: InferGetServerSidePropsType<typeof getServerSideProps>
// ) {
//   // console.log('resourceId: ', resourceId)
//   return (
//     <Layout>
//       <section className="hero ">
//         <div className="hero-body">
//           <div className="container">
//             <section className="section">
//               <div className="columns">
//                 <div className="column is-8 is-offset-2">
//                   <div className="content is-medium">
//                     <h2 className="subtitle is-4">{createdAt || 'December 24, 2023'}</h2>
//                     <h1 className="title">{ title }</h1>
//                     <p>{description}</p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }


// 1) with getInitialProps
function ResourceDetail(
  { resource: { title, description, createdAt } }: ResourceDetailProps) {
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

// 2) ServerSideProps
// Newer and it is main
// export const getServerSideProps: GetServerSideProps<{ resource: Resource }> = async ({ params, query }) => {
//   // [IMPORTANT]
//   // param is more useful
//   /**
//    * url: http://localhost:3000/resources/adfasdfdfadfaf?joon=23
//    * => { joon: '2', id: 'adfasdfdfadfaf' }
//    */
//   // const id = query.id as string;
//   // console.log("query: ", query);

//   // [IMPORTANT]
//   // [Params works like  this]
//   // `param` works only with a single attribute

//   const id = (params!.id) as string;
  
//   try {
//     const resource = await (await fetch(`http://localhost:3001/api/resources/${id}`)).json();

//     if (!resource) {
//       throw new Error('Unable to get the requested resource.');
//     }

//     return {
//       props: {
//         resource,
//       },
//     };
//   } catch(err) {
//     return {
//       notFound: true,
//     }
//   }  
// }

// 1) getInitialProps
// Slightly deprecated but there are many app that are still using this.
// It is a kind of hybrid function because it will be executed both on the server and client
// For instance,
/**
 * when we refreshing the current page, it works in the server side.
 * Therefore, it does not matter for `cors` in the server like in `getServerSideProps`
 * The getServeSideProps is not matter of cors in the server.
 * 
 * However, when we use `Link` or routing system, when the page parks the current page,
 * this `getInitialProps` works in the client side which is http://localhost:3000.
 * Therefore, it generates an `cors` error in the server.
 */
ResourceDetail.getInitialProps = async ({ query }: Context) => {
  // [IMPORTANT]`params` is not available in `getInitialProps`.  
  // const id = (params!.id) as string;
    
    const id = query.id;
    console.log('ddddddddd')

    try {
      const resource = await (await fetch(`http://localhost:3001/api/resources/${id}`)).json();
      if (!resource) {
        throw new Error('Unable to get the requested resource.');
      }
      return {
        resource,
      };
    } catch(err) {
      return {
        notFound: true,
      }
    }
}


export default ResourceDetail;
