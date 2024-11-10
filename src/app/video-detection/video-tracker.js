const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

let isWaiting = false;

// Set up camera
async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      resolve();
    };
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Load the model and start detecting
async function loadModelAndDetect() {
  const model = await facemesh.load();

  // Run detection in real-time
  async function detectNose() {
    if (isWaiting) return;
    const predictions = await model.estimateFaces(video);

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (predictions.length > 0) {
      // Use `for...of` to handle async code properly
      for (const prediction of predictions) {
        const noseTip = prediction.annotations.noseTip[0]; // Nose tip coordinates

        // Draw nose position
        ctx.beginPath();
        ctx.arc(noseTip[0], noseTip[1], 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        if (noseTip[1] < 100) {
          console.log("jumped");
          isWaiting = true;
          await delay(3000); // Delay for 3 seconds
          isWaiting = false; // Reset flag after delay
          console.log("Done delay");
        }

        if (noseTip[1] > 400) {
          console.log("crouched");
          isWaiting = true;
          await delay(3000); // Delay for 3 seconds
          isWaiting = false; // Reset flag after delay
          console.log("Done delay");
        }
      }
    }

    requestAnimationFrame(detectNose);
  }

  detectNose();
}

// Initialize everything
async function main() {
  await setupCamera();
  await loadModelAndDetect();
}

main();
