import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Resource, WithAPIProps } from '@/pages/withAPI_4';
export interface ActivationTime {
  activationTime?: Date,
};

export type ActivatedResource = Resource & ActivationTime;

let time;

function ActiveResource({ isResourceActive = undefined, setIsResourceActive = undefined }: WithAPIProps) {
  const [activeResource, setActiveResource] = useState<ActivatedResource | {}>({});
  const _activeResource = activeResource as ActivatedResource;
  const hasActiveResource = Object.keys(activeResource).length;
  const [updatedTime, setUpdatedTime] = useState<string>('');

  useEffect(() => {
    if (isResourceActive) {
      (async () => {
        try {
          const response = await fetch("/api/active-resource");
  
          if (!response.ok) {
            throw new Error("Could not find an active resource.");
          }
  
          const fetchedActiveResource =  await response.json();
  
          if (Object.keys(fetchedActiveResource).length) {
            const elapsedTIme = Math.round(
              new Date().getTime() / 1000 -
                new Date(fetchedActiveResource.activationTime).getTime() / 1000
            );
  
            setActiveResource(() => ({...fetchedActiveResource}));
  
            const updatedTimeToFinish =
              fetchedActiveResource.timeToFinish * 60 - elapsedTIme;
  
            if (updatedTimeToFinish < 0) return;
  
            setUpdatedTime(() => updatedTimeToFinish.toString());
          }
        } catch (err) {
          throw new Error((err as Error).message);
        }
      })();
    } 

    if (isResourceActive && hasActiveResource) {
      async function completeResource() {
        delete _activeResource.activationTime;

        try {
          const res = await fetch("/api/resources/", {
            method: "PATCH",
            body: JSON.stringify({
              ..._activeResource,
              status: "inactive",
            }),
            headers: { "Content-Type": "application/json" },
          });
  
          if (!res.ok) {
            throw new Error(
              "Something strange thing happened during completing resource."
            );
          }

          if (setIsResourceActive) {
            setIsResourceActive(false)
          }          

          // To get back to the previous buttons and state after the update.
          // location.reload();
        } catch (err) {
          throw new Error((err as Error).message);
        }
      };

      time = setInterval(() => {
        setUpdatedTime((prev) => {
          const _prev = parseInt(prev);
    
          if (_prev >= 1) {
            return (_prev - 1).toString();
          } else {
            completeResource();
            clearInterval(time);
            return '';
          } 
        });
      }, 1000);
    };

    return () => {
      if (time) {
        clearInterval(time);
      }
    };
  }, [isResourceActive, hasActiveResource]);
  
  return (
    <div className="active-resource">
      <h1 className="resource-name">{hasActiveResource ? _activeResource.title : 'No Resource Active'}</h1>
      <div className="time-wrapper">
        <h2 className="elapsed-time">{hasActiveResource && !updatedTime ? 'Completed' : updatedTime}</h2>
      </div>
      <Link className="button" href="/withAPI_4">
        Go to resource
      </Link>
    </div>
  );
};

export default ActiveResource;