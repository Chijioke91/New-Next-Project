import { useState } from 'react';
import styles from '@/styles/Form.module.css';
import { API_URL } from '@/config/index';

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={onFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}