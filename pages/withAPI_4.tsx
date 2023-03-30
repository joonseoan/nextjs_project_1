/**
 * Working with API, resource.ts.
 */

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
};

interface WithAIPStaticProps {
  resources: Array<Resource>,
};

// [IMPORTANT] It works in server and client both!!!
function WithAPI(
  { resources }: WithAIPStaticProps
) {
  // [IMPORTANT]: executes in build time!!
  console.log('client~')
  console.log('resources: ', resources)
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
 * npm run build creates 5 folders
 * 1. pages - client pages (with chunks) and the server api handlers 
 * 2. server - server side renders at runtime (at this time, we use `getServerSideProps`)
 * 3. static - build files
 * 4. SSG (server side generation) - generates static HTML + Json (uses `getStaticProps`)
 * 5. ISR???
 * 
 */

/**
 * getStaticProps VS getServerSideProps
 * 
 * 1. Basically both have the same role to toss props value from the server API
 *  to the client page. Both functions returns `props` to be used in the client component.
 * 
 * 2. Both works only in the server side.
 * 
 * 3. `getServerSideProps` is called every time we will visit the page.
 *  So whenever the data updated in DB, the client is able to get the updated data.
 *  *** This function does not execute in build time.
 * 
 * 4. On the other hand, `getStaticProps` is called only in the `build` time 
 *  Hence, it is called only *** once only in build time. Therefore,
 *  if it fetches data from API server, it generates an error because the server does work.
 *  (Please make sure that that `yarn dev` does not work.)
 * 
 * 5. Specifying `getStaticProps` generates `index.html` in a build directory.
 *  In the build folder, index.html file is requested in the server and then created.
 * 
 * 6. getStaticProps is super fast wo when we are making the request
 *  straight ways to get responds.
 * 
 * 7. Specifying `getServerSideProps` would generate `index.js`
 * 
 * 8. Both can call fetch data in development environment
 *  However, `getStaticProps` function will have a build error when npm run build.
 *  So it should only return the static data like JSON.
 * 
 * 9. Both cannot be used at the same time.
 * 
 * 
 * // Tomorrow GetStaticProps in 9:00
 */

// export async function getServerSideProps(): Promise<{ props: WithAIPStaticProps }> {
//   console.log('works only in server as well')
//   // It can not be found in `bash terminal` in a while of npm run build.
//   // because this functions does not run in a while of build.
//   console.log('calling gerServerSideRendering')
  
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
export async function getStaticProps(): Promise<{ props: WithAIPStaticProps }> {
  console.log('work only in server')
  // It can be found in `bash terminal` in a while of npm run build.
  console.log('calling getStaticProps')
  
  return {
    props: {
      resources,
    },
  };
}

export default WithAPI;
