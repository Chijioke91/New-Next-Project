import styles from '@/styles/Search.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Search() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  const onChange = (e) => setTerm(e.target.value);

  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
        <input type="text" value={term} onChange={onChange} placeholder="Search Events" />
      </form>
    </div>
  );
}
