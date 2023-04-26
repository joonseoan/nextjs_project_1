/**
 * Working with API, resource.ts.
 */
import { useEffect } from "react";

import Layout from "@/components/Layout";
import ResourceHighlight from "@/components/ResourceHighlight";
import NewsLetter from "@/components/NewLetter";
import ResourceList from "@/components/ResourceList";
import { resources } from "@/api/data";

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  priority: number;
  timeToFinish: number;
  active: boolean;
}

export interface WithAIPStaticProps {
  resources: Array<Resource>;
}

// [IMPORTANT] It works in server and client both!!!
function WithAPI({ resources }: WithAIPStaticProps) {
  // [IMPORTANT] This area works in both, clients and server sides.
  console.log("resources: ", resources);
  
  useEffect(() => {
    // [IMPORTANT!!!]
    // [Just for demo to call api in the client side]
    
    // 2) Directly call the server outside
    // [IMPORTANT] The external api server should have cors
    // because this area is bound to localhost:3000 and
    // the api server is bound to localhost:3001.
    // fetch('http://localhost:3001/api/resources')

    // 1) Indirectly call the server outside use next.js api
    // [IMPORTANT] It works well because it calls next.js internal api.
    // fetch('http://localhost:3000/api/resources')
  }, []);

  return (
    <>
      <Layout>
        <ResourceHighlight resources={resources.slice(0, 2)} />
        <NewsLetter />
        <ResourceList resources={resources.slice(2)} />
      </Layout>
    </>
  );
}

/**
 * `npm run build ` with `getStaticProps` creates 5 folders
 * 1. pages - client pages (with chunks) and the server api handlers
 * 2. server - server side renders at runtime (at this time, we use `getServerSideProps`)
 * 3. static - build files containing `WithAPI_4` page.
 * 4. SSG (server side generation) - generates static HTML + Json (uses `getStaticProps`)
 * 5. ISR???
 * 
 * The 'WithAPI_4' is located in the client(○)
 * 
 * On the other hand, `npm run build` with `getServerSideProps` creates only the page folder.
 * and the current `WithAPI_4` page located in the server(λ), not client.
 */

/**
 * getStaticProps VS getServerSideProps
 * 
 * [General concept] `getStaticProps` works as static html file in Browser. 
 * It works in the browser with the defined javascript. 
 * So the server returns `html` and `javascript` files to work together.
 * (Please go to .next/server/pages. In this case, `WithAPI_4.html` and `WithAPI_4.js`) 
 * 
 * On the other hand, `getServerSideProps` does not provide any `html` file. 
 * The `html` file is created by javascript in the server and it returns that page file in runtime.
 * from the server side.
 * 
 * [IMPORTANT]
 * FYI, without both functions, `getStaticProps` and `getServerSideProps`,
 * the page is always static page by default.
 *
 * 1. Basically both have the same role to toss props value from the server API
 *  to the client page. Both functions returns `props` to be used in the client component.
 *
 * 2. Both works only in the server side in the component.
 *
 * 3. `getServerSideProps` is called every time we will visit the page. (because it is created in the server)
 *  So whenever the data updated in DB, the client is able to get the updated data.
 *  *** This function does not execute in build time. It works in compile with npm and yarn dev.
 *
 * 4. On the other hand, `getStaticProps` is called only in the `build` time
 *  Hence, it is called only *** once only in build time. Therefore,
 *  if it fetches data from API server, it generates an error.
 *  FYI, `getStaticProps run at `npm run dev / start` in development mode as well, however,
 *  when we fetch dynamic data, it will generate the error.
 *
 * 5. Specifying `getStaticProps` generates `WithAPI_4.html` in a build directory.
 *  In the `.next` folder, `WithAPI_4.html` file is requested in the server and then created in the browser.
 *
 * 6. `getStaticProps` provides a page super fast when we are making the request
 *  straight ways to get responds.
 *
 * 7. Specifying `getServerSideProps` would generate `WithAPI_4.js`, not WithAPI_4.html.
 *    because html is created by `WithAPI_4`
 * 
 * // [IMPORTANT]
 * 8. Both can call fetch data in development environment
 *  However, `getStaticProps` function will have a build error when `npm run build`.
 *  So it should only return props with the *** static data like JSON ***.
 *
 * 9. Both cannot be used at the same time.
 *
 * 10. With `getServerSideProps`, the data fetched from the api is always fresh (updated).
 *  On the other hand, the data from `getStaticProps` is a static data after build.
 *   
 */

export async function getServerSideProps(): Promise<{
  props: WithAIPStaticProps;
}> {

  /**
   * [IMPORTANT!!!]
   * Both, `getServerSideProps` and `getStaticProps` are not bound
   * to localhost:3000. Only the client (React) side is using localhost:3000 server.
   * Therefore, it does not generate `CORS` error. However, in the client side,
   * definitely generate the CORS error.
   */

  // Direct call for the server outside
  return {
    props: {
      resources: await (
        await fetch("http://localhost:3001/api/resources")
      ).json(),
    },
  };
}

// 1) By using the next.js's internal api --> It has limitation.
// Please visit resources ts.
// export async function getServerSideProps(): Promise<{
//   props: WithAIPStaticProps;
// }> {
//   console.log("works only in server as well");
//   // It can not be found in `bash terminal` in a while of npm run build.
//   // because this functions does not run in a while of build.
//   console.log("calling getServerSideRendering");

//   // [IMPORTANT]
//   // It does not have the fetch error in build time
//   // because this function does execute in build function.
//   return {
//     props: {
//       resources: await (
//         await fetch("http://localhost:3000/api/resources")
//       ).json(),
//     },
//   };
// }

// [IMPORTANT] It works in the server only!
// So that we can make a call the server side handler functions.
// export async function getStaticProps(): Promise<{ props: WithAIPStaticProps }> {
//   console.log('work only in server')
//   // It can be found in `bash terminal` in a while of npm run build.
//   console.log('calling getStaticProps')

//   return {
//     props: {
//       resources,
//     },
//   };
// }

export default WithAPI;
