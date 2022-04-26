// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function hello(_req: NextApiRequest, res: NextApiResponse) {
  // make a call to the base
  // to get the software version
  const apiRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`)
  res.status(200).json(apiRes.data)
}
