import Link from 'next/link';

function ActiveResource() {
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