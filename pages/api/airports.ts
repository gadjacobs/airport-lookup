import { NextApiRequest, NextApiResponse } from 'next';

import { allAirports } from '../../models/airport';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const airports = await allAirports();

  const { page = 1, limit = 20, query = ''} = req.query;

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(page) * Number(limit);

  const results = airports
    .filter(
      (airport) =>
        airport.name.toLowerCase().includes(query.toString().toLowerCase()) ||
        airport.iata.toLowerCase().includes(query.toString().toLowerCase())
    )
    .slice(startIndex, endIndex);

  res.status(200).json(results);
};
