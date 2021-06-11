import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';

export default function Layout({ title, description, keywords, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Dj Events | Latest Events',
  description: 'This allows you find the latest DJs and other musical events',
  keywords: 'events, dj, music, feel good',
};
