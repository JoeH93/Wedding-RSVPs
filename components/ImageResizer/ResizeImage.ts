/**
 * Resizes and compresses an image file in the browser before upload.
 * Keeps the longest side under maxDimension and re-encodes as JPEG
 * at the given quality, so phone camera photos (often 5-10MB) shrink
 * down to a few hundred KB before they're base64-encoded and sent.
 */
export function resizeImage(
  file: File,
  maxDimension = 1600,
  quality = 0.8
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new Image();

      img.onerror = () => reject(new Error("Could not load image"));
      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const base64 = dataUrl.split(",")[1];

        resolve({ base64, mimeType: "image/jpeg" });
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}