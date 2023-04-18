import { NextApiRequest, NextApiResponse } from 'next';

/**
 * [IMPORTANT!!!!!]
 * In the development env, it is ok to use the json files.
 * However, when we deploy the app into the Vercel server,
 * it does not accept the json file to be run in the end point handler.
 * In other words, we cannot store any data file in json in the Vercel server.
 * Therefore, it generates error in the Internet environment.
 * 
 * For this reason, we need to create another server.
 */
import data from './data.json';

// Use typescript
export default async function resources(req: NextApiRequest, res: NextApiResponse) {
  // 2) from the server outside
  res.send(await (await fetch('http:localhost:3001/api/resources')).json())

  // 1) from json file
  // res.send(data);
};