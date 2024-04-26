import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {

  const {events} = useLoaderData();
  
  return (
  <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
    <Await resolve={events}>
      {(loadedEvents) => <EventsList events={loadedEvents}/>}
    </Await>
  </Suspense>
  )
  
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {
        // return {isError: true, message: 'Could not fetch events'}
        // throw new Response(JSON.stringify({message: 'Could not fetch events'}), {status: 500});
        return json({message: 'Could not fetch events.'},
                {status: 500}
        );
      } else {
        const resData = await response.json();
        return resData.events;
        // const res = new Response('any data', {status: 201});
      }
}

export function loader() { // loader는 컴포넌트 실행 전 실행된다. 
  return defer({ // defer 이면 수동으로 파싱해줘야 useLoaderData 에서 받을 수 있다. 
    events: loadEvents()
  })
  
};