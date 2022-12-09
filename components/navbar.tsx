import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

export const NavBar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push('/')}>Home</div>
      <div onClick={() => router.push('/feed/1')}>Feed</div>
    </div>
  );
};