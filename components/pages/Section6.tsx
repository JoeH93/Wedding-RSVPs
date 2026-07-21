"use client"
import { useRef, useState } from "react";
import Divider from "../Divider/Divider";
import { resizeImage } from "../ImageResizer/ResizeImage";

type QueueItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: "pending" | "uploading" | "done" | "error";
  errorMessage?: string;
};

export default function Section6() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [uploaderName, setUploaderName] = useState("");
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const newItems: QueueItem[] = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
    }));
    setQueue((prev) => [...prev, ...newItems]);
  }

  async function uploadOne(item: QueueItem) {
    // Status is already flipped to "uploading" by uploadAll before this runs -
    // this function only needs to resolve to "done" or "error" at the end.
    try {
      const { base64, mimeType } = await resizeImage(item.file);

      const res = await fetch("/api/photo-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: item.file.name,
          mimeType,
          base64Data: base64,
          uploaderName: uploaderName || "Guest",
        }),
      });

      if (!res.ok) throw new Error("Upload failed");

      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: "done" } : q))
      );
    } catch {
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id
            ? { ...q, status: "error", errorMessage: "Failed to upload" }
            : q
        )
      );
    }
  }

  async function uploadAll() {
    const pending = queue.filter((q) => q.status === "pending" || q.status === "error");

    // Mark the whole batch as "uploading" immediately so it's clear right
    // away that everything selected is in flight, even though the actual
    // requests still go out one at a time behind the scenes.
    const pendingIds = new Set(pending.map((q) => q.id));
    setQueue((prev) =>
      prev.map((q) => (pendingIds.has(q.id) ? { ...q, status: "uploading" } : q))
    );

    // Upload sequentially - keeps things simple and avoids hammering the
    // Apps Script endpoint with a burst of simultaneous requests
    for (const item of pending) {
      await uploadOne(item);
    }
  }

  function removeItem(id: string) {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  }

  const hasPending = queue.some(
    (q) => q.status === "pending" || q.status === "error"
  );

  return (
    <section id="photos" className="py-24 px-6 bg-[#F3ECE0]/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-3">
          Share the Moment
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#2B2A28]">
          Photo Memories
        </h2>
        <Divider />

        <p className="text-sm text-[#2B2A28]/70 mb-8">
          Snap a photo or share one from your gallery — every picture helps
          us relive the day from angles we&apos;ll never see ourselves.
        </p>

        <div className="mb-6 text-left max-w-xs mx-auto">
          <label className="block text-xs uppercase tracking-[0.15em] text-[#2B2A28]/70 mb-1.5">
            Your Name (optional)
          </label>
          <input
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-3 text-base bg-white/60 focus:outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Hidden inputs, triggered by the styled buttons below */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="px-6 py-3 min-h-[44px] bg-[#2B2A28] text-[#FBF7F0] uppercase tracking-[0.15em] text-sm hover:bg-[#B08D57] transition-colors"
          >
            Take a Photo
          </button>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="px-6 py-3 min-h-[44px] border border-[#B08D57] text-[#B08D57] uppercase tracking-[0.15em] text-sm hover:bg-[#B08D57] hover:text-white transition-colors"
          >
            Upload from Gallery
          </button>
        </div>

        {queue.length > 0 && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
              {queue.map((item) => (
                <div key={item.id} className="relative aspect-square">
                  <img
                    src={item.previewUrl}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />

                  {item.status === "uploading" && (
                    <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
                      <span className="text-white text-xs">Uploading…</span>
                    </div>
                  )}
                  {item.status === "done" && (
                    <div className="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  )}
                  {item.status === "error" && (
                    <div className="absolute inset-0 bg-red-900/50 rounded-md flex items-center justify-center">
                      <span className="text-white text-xs px-1 text-center">
                        Failed
                      </span>
                    </div>
                  )}

                  {item.status !== "uploading" && item.status !== "done" && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2B2A28] text-white text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {hasPending && (
              <button
                type="button"
                onClick={uploadAll}
                className="w-full max-w-xs mx-auto block bg-[#2B2A28] text-[#FBF7F0] py-3 uppercase tracking-[0.15em] text-sm hover:bg-[#B08D57] transition-colors"
              >
                Upload {queue.filter((q) => q.status === "pending" || q.status === "error").length} Photo(s)
              </button>
            )}

            {!hasPending && queue.length > 0 && (
              <p className="text-sm text-[#8A9A82]">
                All photos uploaded — thank you! 💛
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}