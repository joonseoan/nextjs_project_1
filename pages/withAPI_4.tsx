/**
 * Working with API, resource.ts.
 */

import Layout from "@/components/Layout";

import ResourceHighlight from "@/components/ResourceHighlight";
import NewsLetter from "@/components/NewLetter";
import ResourceList from "@/components/ResourceList";

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
function WithAPI({ resources }: WithAIPStaticProps) {
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

// [IMPORTANT] It works in the server only!
// So that we can make a call the server side handler functions.
export async function getStaticProps(): Promise<{ props: WithAIPStaticProps }> {
  return {
    props: {
      resources: await (
        await fetch('http://localhost:3000/api/resources')
      ).json(),
    },
  };
}

export default WithAPI;
