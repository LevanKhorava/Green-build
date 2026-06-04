import { useEffect } from "react";
import { embedUrl } from "../data/videos";

interface VideoLightboxProps {
  youtubeId: string | null;
  onClose: () => void;
}

const VideoLightbox = ({ youtubeId, onClose }: VideoLightboxProps) => {
  useEffect(() => {
    if (!youtubeId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [youtubeId, onClose]);

  if (!youtubeId) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4
        animate-[fadeSlideUp_0.2s_ease-out_both]"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="დახურვა"
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center
            rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe
          src={embedUrl(youtubeId)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default VideoLightbox;
