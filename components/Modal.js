import styles from '@/styles/Modal.module.css';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ show, onClose, title, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true));

  const modalComponent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={onClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  return isBrowser ? createPortal(modalComponent, document.querySelector('#modal-root')) : null;
}
