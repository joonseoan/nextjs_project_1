import { Resource } from '@/pages/withAPI_4';
import Link from 'next/link';

function ResourceHighlight({ resources }: { resources: Resource[] }) {
  return (
    <>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            { resources.map(({ id, title, description, createdAt }) => (
              <section className="section" key={id}>
                <div className="columns">
                  <div className="column is-8 is-offset-2">
                    <div className="content is-medium">
                      <h2 className="subtitle is-4">{ createdAt || 'December 25, 2022'}</h2>
                      <h1 className="title">{title}</h1>
                      <p>
                        {description}
                      </p>
                      <Link href={`/resources/${id}`} className="button is-link">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ResourceHighlight;
