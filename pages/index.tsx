import styles from '../styles/Home.module.css';
import { NavBar } from '../components/navbar';

export default function Home() {
  return (
    <div className="page-container">
      <NavBar />

      <div className={styles.main}>
        <h1>Next.js News App</h1>
      </div>
    </div>
  );
}
