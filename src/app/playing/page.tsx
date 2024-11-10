import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <h1>LeapCode!</h1>

        <div className={styles.button__container}>
          <ul>
            <li>
              <Link href="/game-start">
                <img src="/start.png" alt="" className={styles.start_bg} />
              </Link>
            </li>
            <li>
              <a href="#">
                <img
                  src="/account.png"
                  alt=""
                  className={styles.leaderboard_bg}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <a href="#">
        <img src="/settings.png" alt="" className={styles.settings} />
      </a>
    </div>
  );
}
