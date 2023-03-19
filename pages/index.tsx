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
// It is pure javascript. Nothing is related to React. --->  next week


