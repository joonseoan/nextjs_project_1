import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Resource } from '@/pages/withAPI_4';
export interface ActivationTime {
  activationTime: Date,
};

export type ActiveResource = Resource & ActivationTime;

let time;

function ActiveResource() {
  const [activeResource, setActiveResource] = useState<ActiveResource | {}>({});
  const [updatedTime, setUpdatedTime] = useState<string>('');

  // Tomorrow!!!!!!!!!!!!!!!!!!!!!
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

        if (Object.keys(activeResource).length) {
          const elapsedTIme = Math.round(new Date().getTime() / 1000 - new Date(activeResource.activationTime).getTime() / 1000);
          const updatedTimeToFinish = activeResource.timeToFinish * 60 - elapsedTIme;  
          
          if (updatedTimeToFinish >= 0) {
            setUpdatedTime((prev) => (updatedTimeToFinish.toString()));
          } else {
            setUpdatedTime('Already Finished.');
          }

          setActiveResource(activeResource);
        }

      } catch(err) {
        throw new Error((err as Error).message);
      }
    };

    fetchResource();

    time = setInterval(() => { 
      setUpdatedTime((prev) => {
        const _prev = parseInt(prev);
        if (_prev >= 1) {
          return (_prev - 1).toString()
        } else {
          clearInterval(time);
          return 'Already Finished.';
        }
      });
    }, 1000);

    return () => {
      if (time) {
        clearInterval(time);
      }
    }
  }, []);

  const {title = 'No activated resource' } = activeResource as ActiveResource;

  return (
    <div className="active-resource">
      <h1 className="resource-name">{title}</h1>
      <div className="time-wrapper">
        <h2 className="elapsed-time">
          { updatedTime }
        </h2>
      </div>
      <Link className="button" href="/withAPI_4">Go to resource</Link>      
    </div>
  );
};

export default ActiveResource;