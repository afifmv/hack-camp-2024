"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Convert the form data to JSON
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      height: formData.get("height"),
      weight: formData.get("weight"),
      score,
    };

    try {
      // Send POST request with JSON body
      let response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(data), // Convert the form data to JSON
      });

      // Handle the response
      response = await response.json();
      if (response.error) {
        alert(`Error: ${response.error}`);
      } else {
        router.push("/scoreboard");
      }
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
    }
  };

  console.log(score);

  return (
    <div className={styles.page}>
      <div>
        <h1>PERSONAL PROFILE</h1>
      </div>
      <div className={styles.personal_profile__container}>
        <div className={styles.inputs_ask__container}>
          <h2>Name</h2>
          <h2>Height</h2>
          <h2>Weight</h2>
        </div>
        <img src="/line.png" alt="Line separator" />
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs__container}>
            <input type="text" name="name" id="name" placeholder="Enter Name" />
            <input
              type="text"
              name="height"
              id="height"
              placeholder="Enter Height"
            />
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="Enter Weight"
            />
            <input type="hidden" name="score" value={score || 0} />
          </div>
          <input
            type="image"
            src="/continue.png"
            alt="Submit"
            className={styles.continue}
          />
        </form>
      </div>
    </div>
  );
}
