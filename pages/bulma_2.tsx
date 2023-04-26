/**
 * Using bulma template.
 * We can find bulma template in google with `bulma template` keyword.
 */
import Layout from "@/components/Layout";

// use absolute path with "jsconfing.json".
// everything is from root folder.
import ResourceHighlight from "@/components/ResourceHighlight";
import NewsLetter from "@/components/NewLetter";
import ResourceList from "@/components/ResourceList";
import { resources } from "@/api/data";

export default function BulmaPractice() {
  return (
    <>
      <Layout>
        <ResourceHighlight resources={resources.slice(0, 2)} />
        <NewsLetter />
        <ResourceList resources={resources.slice(2)}/>
      </Layout>
    </>
  );
}
