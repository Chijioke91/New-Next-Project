import Link from 'next/link';
import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL, PER_PAGE } from '@/config/index';
import { Pagination } from '@/components/Pagination';

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 ? <h3>No Events Found</h3> : events.map((evt) => <EventItem key={evt.id} evt={evt} />)}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Previous</a>
        </Link>
      )}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // fetch events count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const totalEventsCount = await totalRes.json();

  // fetch total events
  const evtRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await evtRes.json();

  return {
    props: {
      events,
      page: +page,
      total: totalEventsCount,
    },
  };
};
