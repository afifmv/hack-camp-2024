"use client";
import { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import styles from "./page.module.css";

interface VideoTrackerProps {
  onJump: () => void;
  onCrouch: () => void;
}

export default function VideoTracker({ onJump, onCrouch }: VideoTrackerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isWaitingRef = useRef(false);
  const modelRef = useRef<facemesh.MediaPipeFaceMesh | null>(null);
  const animationFrameRef = useRef<number>();
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Setup camera stream
  useEffect(() => {
    async function setupCamera() {
      const video = videoRef.current;
      if (!video) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: "user",
          },
        });
        video.srcObject = stream;

        return new Promise<void>((resolve) => {
          video.onloadeddata = () => {
            setIsVideoReady(true);
            resolve();
          };
        });
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    setupCamera();

    return () => {
      // Cleanup camera stream
      const video = videoRef.current;
      if (video?.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Load model and start detection
  useEffect(() => {
    if (!isVideoReady) return;

    async function loadModel() {
      try {
        modelRef.current = await facemesh.load({
          maxFaces: 1,
          shouldLoadIrisModel: false,
        });
      } catch (error) {
        console.error("Error loading face mesh model:", error);
      }
    }

    loadModel();
  }, [isVideoReady]);

  // Handle face detection
  useEffect(() => {
    if (!isVideoReady || !modelRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Adjust canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let previousNoseY = 0;
    const threshold = 30; // Adjust this value to make detection more/less sensitive

    async function detectFace() {
      if (isWaitingRef.current || !modelRef.current) return;

      try {
        const predictions = await modelRef.current.estimateFaces(video);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
          const face = predictions[0];
          const noseTip = face.annotations.noseTip[0];

          // Draw nose point
          ctx.beginPath();
          ctx.arc(noseTip[0], noseTip[1], 5, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();

          // Detect significant vertical movement
          if (previousNoseY !== 0) {
            const movement = previousNoseY - noseTip[1];

            if (movement > threshold && !isWaitingRef.current) {
              // Moving up - Jump
              onJump();
              isWaitingRef.current = true;
              setTimeout(() => {
                isWaitingRef.current = false;
              }, 1000);
            } else if (movement < -threshold && !isWaitingRef.current) {
              // Moving down - Crouch
              onCrouch();
              isWaitingRef.current = true;
              setTimeout(() => {
                isWaitingRef.current = false;
              }, 1000);
            }
          }

          previousNoseY = noseTip[1];
        }

        animationFrameRef.current = requestAnimationFrame(detectFace);
      } catch (error) {
        console.error("Error during face detection:", error);
        animationFrameRef.current = requestAnimationFrame(detectFace);
      }
    }

    detectFace();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVideoReady, onJump, onCrouch]);

  return (
    <div className={styles.canvas}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          display: "block",
          transform: "scaleX(-1)", // Mirror the video
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "scaleX(-1)", // Mirror the canvas to match video
        }}
      />
    </div>
  );
}
