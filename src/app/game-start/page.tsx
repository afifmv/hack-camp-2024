import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <h1>HOW TO PLAY</h1>
      </div>
      <div className={styles.how_to_play__container}>
        <div>
          <h2 className={styles.bigh2}>JUMP</h2>
          <img src="/jump.png" alt="" />
        </div>

        <h2 className={styles.smallh2}>And</h2>

        <div>
          <h2 className={styles.bigh2}>Squat</h2>
          <img src="/jump.png" alt="" />
        </div>

        <h2 className={styles.smallh2}>To dodge the deoderants!</h2>
        <h2 className={styles.smallh2}>Collect milkteas for a highscore!</h2>
      </div>
      <Link href="/game-start/profile">
        <img src="/continue.png" alt="" className={styles.continue} />
      </Link>
    </div>
  );
}
