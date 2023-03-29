import { NextApiRequest, NextApiResponse } from 'next';
import data from './data.json';

// Use typescript
export default function resources(req: NextApiRequest, res: NextApiResponse) {
  res.send(data);
};