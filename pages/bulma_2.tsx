/**
 * Using bulma template. We can find bulma template in google with `bulma template` keyword.
 */

import NavBar from "@/components/NavBar";
import ResourceHighlight from "@/components/ResourceHighlight";
import NewsLetter from "@/components/NewLetter";
import ResourceList from "@/components/ResourceList";
import Footer from "@/components/Footer";

export default function BulmaPractice() {
  return (
    <>
      <NavBar />
      <ResourceHighlight />
      <NewsLetter />
      <ResourceList />
      <Footer />
    </>
  );
}
