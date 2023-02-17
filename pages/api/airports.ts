import { NextApiRequest, NextApiResponse } from 'next'

import { allAirports } from '../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const airports = await allAirports();

  const { page = 1, limit = 20 } = req.query;

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(page) * Number(limit);

  res.status(200).json(airports.slice(startIndex, endIndex));
}
