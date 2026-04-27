import Image, { type StaticImageData } from "next/image";

type Props = {
  className?: string;
  image: StaticImageData;
  imageAlt?: string;
  imageClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
  videoClassName?: string;
  videoPoster?: string;
  videoSrc?: string;
};

export function AmbientMedia({
  className = "",
  image,
  imageAlt = "",
  imageClassName = "",
  overlayClassName = "",
  priority = false,
  videoClassName = "",
  videoPoster,
  videoSrc,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        placeholder="blur"
        sizes="100vw"
        className={`object-cover ${imageClassName}`}
      />
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={videoPoster}
          className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
        >
          <source src={videoSrc} type="video/webm" />
        </video>
      ) : null}
      {overlayClassName ? (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      ) : null}
    </div>
  );
}
