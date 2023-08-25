import type { AppProps } from 'next/app';
// Installation bulma. It works for all pages.
import 'bulma/css/bulma.min.css';
// It works for all the pages.
import '../styles/globals.css';
import { useCallback, useState } from 'react';

// We can edit the function name to another, for instance `MainApp`.
function App({ Component, pageProps }: AppProps) {
  const [isResourceActive, setIsResourceActive] = useState<boolean>(false);
  /**
   * Component is a function of `Home`
   * 
   * - everything all of our `pages` are going through `_app.ts`
   * - And Component we are going to display is our page we are navigating to in this `index.ts` page.
   *   . console.log(Component) : Home function.
   *   . What something is interested in is that we do not need to specify `underscore` app.js for
   *     this page in the next.js frame work. We can remove `underscore` in _app.js and it still
   *     works well. Also, even if we remove app.tsx or _app.tsx, it work well. (However, we still need
   *     `app.tsx` or `_app.tsx`, to modify the `Component` and `pageProps`)
   */

  const _setIsResourceActive = useCallback((active: boolean) => {
    setIsResourceActive(active);
  }, []);
  
  // [IMPORTANT] This area executes in build time!!! (npm run build)
  // Also every single page functions also executes in build time.
  // console.log('Component: ', Component)
  return <Component {...pageProps} isResourceActive={isResourceActive} setIsResourceActive={_setIsResourceActive} />
}

export default App;