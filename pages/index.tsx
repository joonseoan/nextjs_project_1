import { Component, createElement } from "react";

/**
 * [IMPORTANT]
 * Arrow function and normal function have the different context value of `this`
 */

const ArrowFunction = () => {
  // [IMPORTANT]
  // this: undefined!!
  console.log('this in the arrow function: ', this);
  return <div>ArrowFunction</div>;
}


function Compo_2(this: any) {
  // [IMPORTANT]
  // this: has any type of this function.
  console.log('this in normal function: ', this);
  return <div>
    <h1>hm...</h1>
    <ArrowFunction />
  </div>;
};


function Compo_1() {
  // return(
  //   <div>
  //     <h1>Hi, there!</h1>
  //   </div>
  // );

  // It is same as the return above.
  return createElement(
    "div",
    null,
    createElement("h1", null, "Hi, there!"),
    createElement("p", null, "Hi, component!"),
    // [IMPORTANT]
    // should not use quotation mark for the custom component.
    createElement(Compo_2, null)
  );
};

class CompoExample extends Component {
  render()  {
    console.log('this in class component: ', this) // CompoExample
    // create XML
    // `h1`: XML element
    // `null`: the parameter for `h1`
    // `Hey, how are you?`: innerText in XML.
    return createElement('h1', null, 'Hey, how are you?');
  }
}

export default function Home() {
  // - JSX: javascript XML (Javascript returns abstracted XML
  //    actually in React. It is not possible to return HTML in Javascript)
  return (
    <>
      <h1>Hello</h1>
      <Compo_1 />
      <CompoExample />
    </>
  );
}

// ------------------------- server side rendering vs client side rendering -------------------------
// It is pure javascript. Nothing is related to React.

// [Client side rendering]: So it works in the browser without server side rendering.
// Paste it into console in the browser. we will see Hello World in browser.
// const node = document.createElement('h1');
// const text = document.createTextNode('Hello World!');
// node.appendChild(text);
// // __next is a id for next.js
// document.getElementById('__next')?.appendChild(node);

// [Compiling into pure javascript]
// So main.js file in the network tab of the browser shows the appendChild...
// Then they are all that are compiled in pure javascript from React.js.

// [Bundling]
// 1. yarn build
// 2. Go to `.next` folder -->  server --> pages --> index.html
// 3. copy the code in index.html and paste it `html formatter` (We can google it in the browser)
// and then paste back to index.html.
// 4. Drag the html file into the url bar in the browser.
// 5. Open network tab in the browser. Then we can find the css and javascript files are not correctly loaded.
//  --> need to remember in the normal way when we are creating the request on the internet or localhost ()
//      when we are asking HTML document, that HTML document is sent by some server. The server itself
//      is an application like next.js. (It can be node.js application or java application, etc)
//      Also, the file (containing HTML) is an application. This application is also handling how we will accessing.
//      (Result) so in this case, css and javascript files are not handled by server in the background.
//
//      BTW, we can fix this one manually
//      <link rel="preload" href="/__next/static/css/bf11da85c9e157dc.css" as="style"/> ====> <link rel="preload" href="../../static/css/bf11da85c9e157dc.css" as="style"/> 
//      <script src="/__next/static/FLs78tYKW8hMptAE6wNBV/_ssgManifest.js" defer=""></script> ==> <script src="../../static/FLs78tYKW8hMptAE6wNBV/_ssgManifest.js" defer=""></script>

// [Client Side Rendering]
// Empty HTML file. But Javascript and CSS files are loaded, THey are responsible
//  for rendering contents
// [Server side rendering]
// Having all content with data in a HTML file sent from from the server.
// Also additional Javascript files are loaded to the browser because
//  Javascript is responsible for user interactions.