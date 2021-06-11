import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 ? <h3>No Events Found</h3> : events.map((evt) => <EventItem key={evt.id} evt={evt} />)}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const { data } = await res.json();

  return {
    props: {
      events: data,
    },
    revalidate: 1,
  };
};
