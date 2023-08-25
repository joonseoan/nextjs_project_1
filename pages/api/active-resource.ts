import { NextApiRequest, NextApiResponse } from "next";
import { ActivatedResource } from "@/components/ActiveResource";

export default async function activeResource(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${process.env.API_URL}/active-resource`);
    
    if (!response.ok) {
     throw new Error('Unable to fetch an active resource'); 
    }

    const activeResource: ActivatedResource = await response.json();

    res.send(activeResource);
  } catch(err) {
    throw new Error((err as Error).message);
  }
}