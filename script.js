// Elements
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// Given images array (you provided this)
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// UI helper functions
function showLoading() { loading.style.display = "block"; }
function hideLoading() { loading.style.display = "none"; }
function showError(msg) { errorDiv.textContent = msg; errorDiv.style.display = "block"; }
function hideError() { errorDiv.textContent = ""; errorDiv.style.display = "none"; }
function clearOutput() { output.innerHTML = ""; }

// Worker: download one image, resolve with <img>, reject with descriptive error
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

// Main: download all images in parallel using Promise.all
async function downloadImages(urls) {
  clearOutput();
  hideError();
  showLoading();

  try {
    if (!urls || urls.length === 0) {
      throw new Error("No image URLs provided.");
    }

    // Start all downloads in parallel
    const promises = urls.map(downloadImage);
    const imgs = await Promise.all(promises); // rejects if any fail

    // Append results to the DOM
    imgs.forEach(img => {
      const box = document.createElement("div");
      box.className = "img-box";
      box.appendChild(img);
      output.appendChild(box);
    });
  } catch (err) {
    // If any promise fails, show descriptive error message
    showError(err.message || "An error occurred while downloading images.");
  } finally {
    hideLoading(); // always hide loading
  }
}

// Wire button to trigger downloads
btn.addEventListener("click", () => {
  const urls = images.map(i => i.url);
  downloadImages(urls);
});
