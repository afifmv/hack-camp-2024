// VideoTracker.tsx
import { useEffect, useRef } from "react";
import "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import styles from "./page.module.css";

interface VideoTrackerProps {
  onJump: () => void; // Add onJump as a function prop
}

export default function VideoTracker({ onJump }: VideoTrackerProps) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const isWaitingRef = useRef(false);

  useEffect(() => {
    async function setupCamera() {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve();
        };
      });
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function loadModelAndDetect() {
      const model = await facemesh.load();
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      async function detectNose() {
        if (!video || !canvas || isWaitingRef.current) return;

        const predictions = await model.estimateFaces(video);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
          for (const prediction of predictions) {
            const noseTip = prediction.annotations.noseTip[0]; // Nose tip coordinates

            ctx.beginPath();
            ctx.arc(noseTip[0], noseTip[1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            // Check nose position for jump
            if (noseTip[1] < 100 && !isWaitingRef.current) {
              console.log("jump detected");
              onJump(); // Call the jump function passed as prop
              isWaitingRef.current = true;
              await delay(3000);
              isWaitingRef.current = false;
              console.log("Done delay");
            }
          }
        }

        requestAnimationFrame(detectNose);
      }

      detectNose();
    }

    async function main() {
      await setupCamera();
      await loadModelAndDetect();
    }

    main();
  }, [onJump]); // Ensure that the onJump function is updated correctly

  return (
    <div className={styles.canvas}>
      <video ref={videoRef} autoPlay playsInline style={{ display: "" }} />
      <canvas ref={canvasRef} width="300" height="300" />
    </div>
  );
}
