import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Resource } from '@/pages/withAPI_4';

function ActiveResource() {
  const [resource, setResource] = useState<Resource | {}>({});

  // [TODO - IMPORTANT!!!]
  // It is important understand when we need to fetch data in the client side
  // and when we need to fetch data in the server side by using serverSideProps
  // getStaticProps.!!!
  useEffect(() => {
    async function fetchResource() {
      try {
        const response = await fetch('/api/active-resource');

        if (resource) {

        }

      } catch(err) {

      }
    };

    fetchResource();

  }, []);

  return (
    <div className="active-resource">
      <h1 className="resource-name">My Active Resource</h1>
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