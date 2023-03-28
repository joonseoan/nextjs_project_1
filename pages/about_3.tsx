/**
 * Child Component
 */

import Layout from "@/components/Layout";
import { resources } from "@/api/data";

function About() {
  return(
    <>
      <Layout>
        <h1>I am about page</h1>
        <h2>Hello World</h2>
        <h3>Hi There!</h3>
        {JSON.stringify(resources)}
      </Layout>
    </>

  )
}

export default About;

