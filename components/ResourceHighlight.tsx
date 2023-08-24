import { Resource } from '@/pages/withAPI_4';
import ResourceLabel from './ResourceLabel';
import { useRouter } from 'next/router';

function ResourceHighlight({ resources }: { resources: Resource[] }) {
  const router = useRouter();

  return (
    <>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            {resources.map(({ id, title, description, createdAt, status }) => (
              <section className="section" key={id}>
                <div className="columns">
                  <div className="column is-8 is-offset-2">
                    <div className="content is-medium">
                      <h2 className="subtitle is-4">
                        {createdAt ? new Date(createdAt).toDateString() : "Tue July 25, 2023"}
                        <ResourceLabel status={status} />
                      </h2>
                      <h1 className="title">{title}</h1>
                      <p className="mb-2">{description}</p>
                      <a
                        onClick={(event) => {
                          event.preventDefault();
                          router.push({
                            pathname: `/resources/${id}`,
                          })
                        }}
                        className="button is-light"
                      >
                        Details
                      </a>
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
