import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Resource } from '@/pages/withAPI_4';
export interface ActivationTime {
  activationTime: Date,
};

export type ActiveResource = Resource & ActivationTime;

function ActiveResource() {
  const [activeResource, setActiveResource] = useState<Resource | {}>({});

  // [TODO - IMPORTANT!!!]
  // It is important understand when we need to fetch data in the client side
  // and when we need to fetch data in the server side by using serverSideProps
  // getStaticProps.!!!
  useEffect(() => {
    async function fetchResource() {
      try {
        const response = await fetch('/api/active-resource');

        if (!response.ok) {
          throw new Error('Could not find an active resource.')
        }

        const activeResource: ActiveResource = await response.json();
        const resource = activeResource.timeToFinish;
        // Change this one!!!!
        const elapsedTIme = new Date().getSeconds() - new Date(activeResource.activationTime).getSeconds();
        alert(elapsedTIme);
        setActiveResource(activeResource);
      } catch(err) {
        throw new Error((err as Error).message);
      }
    };

    fetchResource();
  }, []);

  const hasActiveResource = !!Object.keys(activeResource).length;

  return (
    <div className="active-resource">
      <h1 className="resource-name">{hasActiveResource ? (activeResource as Resource).title : ''}</h1>
      <div className="time-wrapper">
        <h2 className="elapsed-time">
          1400
        </h2>
      </div>
      <Link className="button" href="/withAPI_4">Go to resource</Link>      
    </div>
  );
};

export default ActiveResource;