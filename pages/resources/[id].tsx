import Layout from "@/components/Layout";
import { 
  // 2) ServerSideProps
  InferGetServerSidePropsType,
  GetServerSideProps,
  // 1-5) GetStaticProps
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  // 1) GetInitialProps (deprecated)
  NextPage,
  NextPageContext,
} from "next";

import { ParsedUrlQuery } from 'querystring';

import { Resource } from "../withAPI_4";

// for 2) and 1-5)
interface IParams extends ParsedUrlQuery {
  id: string;
}

// 1) for getInitialProps only (deprecated)
// export interface Context extends NextPageContext {
//   query: {
//     id: string;
//   }  
// };

// for getInitialProps only
// export interface ResourceDetailProps {
//   resource:  Resource;
// }


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

// 1-5) with getStaticProps
function ResourceDetail(
  { resource: { title, description, createdAt } }: InferGetStaticPropsType<typeof getStaticProps>
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

// 1) with getInitialProps
// function ResourceDetail(
//   { resource: { title, description, createdAt } }: ResourceDetailProps) {
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

// 2) ServerSideProps
// Newer and it is main
// export const getServerSideProps: GetServerSideProps<{ resource: Resource }> = async ({ params, query }) => {
//   // [IMPORTANT]
//   // query is more useful
//   /**
//    * url: http://localhost:3000/resources/adfasdfdfadfaf?joon=23
//    * => { joon: '23', id: 'adfasdfdfadfaf' }
//    */
//   // const id = query.id as string;
//   // const { id } = query as IParams;

//   // console.log("query: ", query);

//   // [IMPORTANT]
//   // [Params works like  this]
//   // `param` works only with a single attribute
//   const { id } = params as IParams;
//   // const id = (params!.id) as string;
  
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

// 1-5) getStaticProps
// Once again, `getStaticProps` is called at the build time. At a build time since our page
// is dynamic which means [id]tsx, 
// we need to know all of the IDs for all of the resource pages before we need to create.
// So we need to introduce `getStaticPaths`.

// Once again, `getStaticPaths` is only for the dynamic page with `getStaticProps`
export const getStaticPaths: GetStaticPaths = async () => {
  const resData = await fetch("http://localhost:3001/api/resources");
  const data = await resData.json();

  const paths = data.map((resource) => {
    return {
      params: { id: resource.id }
    }
  });

  return { 
    paths,
    // means that other routes (no `id` routes) should resolve into 404 page
    fallback: false 
  };
}

export const getStaticProps: GetStaticProps<{ resource: Resource }> = async ({ params }) => {
  const { id } = params as IParams;
  
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

// 1) getInitialProps (deprecated)
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
// ResourceDetail.getInitialProps = async ({ query }: Context) => {
//   // [IMPORTANT]`params` is not available in `getInitialProps`.  
//   // const id = (params!.id) as string;
    
//     const id = query.id;
//     console.log('ddddddddd')

//     try {
//       const resource = await (await fetch(`http://localhost:3001/api/resources/${id}`)).json();
//       if (!resource) {
//         throw new Error('Unable to get the requested resource.');
//       }
//       return {
//         resource,
//       };
//     } catch(err) {
//       return {
//         notFound: true,
//       }
//     }
// }



export default ResourceDetail;


/**
// SSR (server side rendering)
Rendering at run time with getServerSideProps() means that
the site is live and hosted with React components sitting on the server awaiting a request.
However, when a request is made, the server doesn’t send the Javascript React files to the client 
for rendering. Instead, NextJs tells React to go ahead and render these components into HTML 
in real time, then send the HTML to the client.

If you need a lot of dynamic data on your page, 
it’s more scalable to render your page at run time (SSR), 
and therefore getServerSideProps would be the preferred method.  
Pages built using getServerSideProps for SSR won’t be as fast as SSG, 
however, it is optimal when compared to utilizing a standard SPA framework.

// SSG (static site generation)
Rendering at build time with getStaticProps() means that prior to hosting the page, 
the developer (or automation tool) converts the React into raw HTML pages, 
and only then are the pages hosted and served to clients. 
Raw HTML pages are optimal for SEO and fast page loading.

If your page is more simple in nature, such as a blog post, 
you’ll get a performance boost rendering a static HTML page at build time (SSG), 
and therefore getStaticProps would be preferred. 
Pages built using getStaticProps for SSG will be very fast.
 */
