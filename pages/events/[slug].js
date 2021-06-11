import Link from 'next/link';
import Image from 'next/image';
import { FaPenAlt, FaTimes } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

export default function EventPage({ evt }) {
  const deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPenAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={() => deleteEvent(evt.id)}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}

        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`${API_URL}/api/events`);
  const { data } = await result.json();

  const paths = data.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const result = await fetch(`${API_URL}/api/events/${slug}`);
  const { data } = await result.json();

  return {
    props: {
      evt: data[0],
    },
    revalidate: 1,
  };
};
