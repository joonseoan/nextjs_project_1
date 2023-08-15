// import Link from 'next/link';
import { useRouter } from 'next/router';
import { Resource } from '@/pages/withAPI_4';
import ResourceLabel from './ResourceLabel';

function ResourceList({ resources, hasActiveResource }: { resources: Resource[], hasActiveResource: boolean }) {
  const router = useRouter();

  return (
    <>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns is-multiline is-variable is-8">
                {resources.map(
                  ({ id, title, description, status, createdAt }) => (
                    <div className="column is-5 is-offset-1" key={id}>
                      <div className="content is-medium">
                        <h2 className="subtitle is-5 has-text-grey">
                          {createdAt
                            ? new Date(createdAt).toDateString()
                            : "Tue July 23, 2023"}
                          <ResourceLabel status={status} />
                        </h2>
                        <h1 className="title has-text-black is-3">{title}</h1>
                        <p className="has-text-dark mb-2">{description}</p>
                        <a className="button is-light" onClick={() => {
                          router.push({
                            pathname: `/resources/${id}`,
                            query: { hasActiveResource }
                          });
                        }}>Details</a>
                        {/* <Link
                        href={`/resources/${id}`}
                        className="button is-light">
                        Details
                      </Link> */}
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResourceList;
