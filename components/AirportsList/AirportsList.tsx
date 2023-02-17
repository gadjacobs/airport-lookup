import * as React from 'react';
import Airport from '../../types/airport';

export interface IAirportsListProps {
  airports: Airport[];
}

export default function AirportsList(props: IAirportsListProps) {
  return (
    <div className="flex flex-wrap">
      {props.airports.map((airport) => (
        <div className='p-4 w-full lg:w-1/2'>
          <a
            href={`/airports/${airport.iata.toLowerCase()}`}
            key={airport.iata}
            className="mt-5 flex items-center shadow p-5 border w-full md:w-1/"
          >
            <div>
              {airport.name}, {airport.city}
            </div>
            <div className="ml-auto text-mono">{airport.country}</div>
          </a>
        </div >
      ))}
      <div className='flex flex-row w-full'>
        <button type="button" className="mx-auto w-auto m-5" disabled>
          <svg
            className="animate-spin h-5 w-5 mr-3 fill-black stroke-white ..."
            viewBox="0 0 24 24"
          ></svg>
          Fetching more...
        </button>
      </div >
    </div>
  );
}
