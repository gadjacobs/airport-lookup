import * as React from 'react';
import Airport from '../../types/airport';

export interface IAirportsListProps {
  airports: Airport[];
  loading: boolean;
}

export default function AirportsList(props: IAirportsListProps) {
  return (
    <div className="flex flex-wrap">
      {props.airports.map((airport) => (
        <div key={airport.iata} className="p-2 w-full lg:w-1/2">
          <a
            href={`/airports/${airport.iata.toLowerCase()}`}
            key={airport.iata}
            className="mt-5 flex flex-col shadow p-6 border border-gray-200 rounded-lg"
          >
            <div>
              {airport.name}, {airport.city}
            </div>
            <div className="text-mono text-gray-400 mt-2">{airport.country}</div>
          </a>
        </div>
      ))}
      {props.loading && (
        <div className="flex flex-row w-full">
          <p className="mx-auto w-auto m-5">Fetching more...</p>
        </div>
      )}
    </div>
  );
}
