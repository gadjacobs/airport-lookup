import * as React from 'react';

import Airport from '../../types/airport';
import InfiniteScroll from 'react-infinite-scroller';
import airports from '../../pages/api/airports';

export interface IAirportsListProps {
  airports: Airport[];
}

export default function AirportsList(props: IAirportsListProps) {
  const itemsPerPage = 5;
  const [hasMore, setHasMore] = React.useState(true);
  const [totalList, setTotalList] = React.useState(itemsPerPage);

  const loadFunc = () => {
    if (totalList >= airports.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setTotalList(totalList + itemsPerPage);
      }, 2000);
    }
  };

  return (
    <>

        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          <div className='w-full flex flex-col'>
          {props.airports.map((airport) => (
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
          ))}
      </div>
        </InfiniteScroll>
    </>
  );
}
