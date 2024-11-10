import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <h1>CS GO!</h1>

        <div className={styles.button__container}>
          <ul>
            <li>
              <a href="#">
                <img src="/start.png" alt="" className={styles.start_bg} />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="/leaderboard.png"
                  alt=""
                  className={styles.leaderboard_bg}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
  );
}
