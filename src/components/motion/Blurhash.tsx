import { useEffect, useRef, useState, type CSSProperties, type ImgHTMLAttributes, type Ref, type VideoHTMLAttributes } from 'react';
import { decode } from 'blurhash';
import { blurhashes } from '../../data/blurhashes';

// Internal: decode a blurhash string onto a tiny canvas. The canvas is
// stretched via CSS to fill its parent — the browser smooths it into a soft
// blurred placeholder.
const CANVAS_SIZE = 32;

export function BlurhashCanvas({
  hash,
  className,
  style,
}: {
  hash: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const pixels = decode(hash, CANVAS_SIZE, CANVAS_SIZE);
    const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }, [hash]);
  return (
    <canvas
      ref={ref}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      aria-hidden
      className={className}
      style={style}
    />
  );
}

function resolveHash(src: string, override?: string): string | undefined {
  return override ?? blurhashes[src]?.hash;
}

/**
 * Render only the blurhash placeholder for the given asset path (looking up
 * the hash from the generated map). Positions absolutely to fill its parent.
 */
export function BlurhashPlaceholder({
  src,
  hash: hashOverride,
  className,
}: {
  src: string;
  hash?: string;
  className?: string;
}) {
  const hash = resolveHash(src, hashOverride);
  if (!hash) return null;
  return (
    <BlurhashCanvas
      hash={hash}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ''}`}
    />
  );
}

type BlurhashImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  /** Override the hash lookup. */
  hash?: string;
  /** Fade-in duration in ms. */
  fadeMs?: number;
  /** Extra classes on the blurhash canvas. */
  placeholderClassName?: string;
};

/**
 * Renders a blurhash placeholder canvas behind an <img>, fading the image
 * in once it has loaded. The placeholder + image are siblings positioned with
 * `absolute inset-0` — the parent MUST be `position: relative` and sized.
 */
export function BlurhashImage({
  src,
  hash: hashOverride,
  fadeMs = 500,
  placeholderClassName,
  className,
  style,
  onLoad,
  ...rest
}: BlurhashImageProps) {
  const hash = resolveHash(src, hashOverride);
  // If the browser already has it cached we want to skip the fade.
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [src]);

  return (
    <>
      {hash && !loaded && (
        <BlurhashCanvas
          hash={hash}
          className={`absolute inset-0 w-full h-full pointer-events-none ${placeholderClassName ?? ''}`}
        />
      )}
      <img
        {...rest}
        ref={imgRef}
        src={src}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={className}
        style={{
          ...style,
          opacity: loaded || !hash ? 1 : 0,
          transition: `opacity ${fadeMs}ms ease`,
        }}
      />
    </>
  );
}

type BlurhashVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> & {
  src: string;
  /** Override the hash lookup. */
  hash?: string;
  /** Fade-in duration in ms. */
  fadeMs?: number;
  videoRef?: Ref<HTMLVideoElement>;
};

/**
 * Renders a blurhash placeholder (derived from the video's first frame) behind
 * a <video>, fading the video in once its first frame is decoded. Parent must
 * be `position: relative` and sized.
 */
export function BlurhashVideo({
  src,
  hash: hashOverride,
  fadeMs = 500,
  videoRef,
  className,
  style,
  onLoadedData,
  ...rest
}: BlurhashVideoProps) {
  const hash = resolveHash(src, hashOverride);
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {hash && !loaded && (
        <BlurhashCanvas
          hash={hash}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
      <video
        {...rest}
        ref={videoRef}
        src={src}
        onLoadedData={(e) => {
          setLoaded(true);
          onLoadedData?.(e);
        }}
        className={className}
        style={{
          ...style,
          opacity: loaded || !hash ? 1 : 0,
          transition: `opacity ${fadeMs}ms ease`,
        }}
      />
    </>
  );
}
