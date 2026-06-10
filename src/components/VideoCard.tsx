import type { Video } from "../data/videos";
import { thumbnailUrl } from "../data/videos";

interface VideoCardProps {
  video: Video;
  onPlay: (youtubeId: string) => void;
}

const VideoCard = ({ video, onPlay }: VideoCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onPlay(video.youtubeId)}
      className="group block w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100
        overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#1f3f3a] focus:ring-offset-2"
    >
      <div className="px-5 pt-4 pb-3">
        <p className="text-xs text-[#1f3f3a]/70 uppercase tracking-wide">
          გრინბილდის მაცხოვრებელი
        </p>
        <h3 className="text-base font-bold text-[#333333] mt-0.5">
          {video.author}
        </h3>
      </div>
      <div className="relative aspect-video bg-gray-100">
        <img
          src={thumbnailUrl(video.youtubeId)}
          alt={video.author}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <span
            className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-lg
            group-hover:scale-110 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1f3f3a"
              className="w-7 h-7 ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
};

export default VideoCard;
