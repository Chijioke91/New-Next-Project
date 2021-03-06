import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';

export default function AddEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const { name, performers, venue, address, date, time, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const emptyFormFieldsExists = Object.values(formData).some((el) => el === '');

    if (emptyFormFieldsExists) {
      return toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      return toast.error();
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" value={name} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" name="performers" id="performers" value={performers} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" id="venue" value={venue} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" value={address} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" value={date} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" value={time} onChange={onChange} />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" name="description" id="description" value={description} onChange={onChange}></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}
