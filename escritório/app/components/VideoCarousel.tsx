"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const videos = [
  {
    src: "/videos/cavaletti-aura.mp4",
    mobileSrc: "/videos/cavaletti-aura-mobile.mp4",
    title: "Cavaletti Aura",
  },
  {
    src: "/videos/cavaletti-leef.mp4",
    mobileSrc: "/videos/cavaletti-leef-mobile.mp4",
    title: "Cavaletti Leef",
  },
  {
    src: "/videos/cavaletti-yon.mp4",
    mobileSrc: "/videos/cavaletti-yon-mobile.mp4",
    title: "Cavaletti Yon",
  },
];

export function VideoCarousel() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const playVideo = useCallback((video: HTMLVideoElement | null) => {
    if (!video) {
      return;
    }

    video.controls = false;
    video.defaultMuted = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setIsLoaded(true);
    }

    void video.play().catch(() => undefined);
  }, []);

  const playAllVideos = useCallback(() => {
    const isMobile = window.matchMedia("(max-width: 760px)").matches;

    videoRefs.current.forEach((video, index) => {
      if (isMobile && index !== activeVideo) {
        video?.pause();
        return;
      }

      playVideo(video);
    });
  }, [activeVideo, playVideo]);

  const goToVideo = useCallback((index: number) => {
    setActiveVideo((index + videos.length) % videos.length);
  }, []);

  const goToNextVideo = useCallback(() => {
    setActiveVideo((currentVideo) => (currentVideo + 1) % videos.length);
  }, []);

  const goToPreviousVideo = () => {
    setActiveVideo(
      (currentVideo) => (currentVideo - 1 + videos.length) % videos.length,
    );
  };

  useEffect(() => {
    const loadingFallback = window.setTimeout(() => {
      setIsLoaded(true);
      playAllVideos();
    }, 900);

    const resumePlayback = () => {
      if (!document.hidden) {
        playAllVideos();
      }
    };

    playAllVideos();
    document.addEventListener("visibilitychange", resumePlayback);
    window.addEventListener("focus", playAllVideos);
    window.addEventListener("pointerdown", playAllVideos, { passive: true });
    window.addEventListener("touchstart", playAllVideos, { passive: true });

    return () => {
      window.clearTimeout(loadingFallback);
      document.removeEventListener("visibilitychange", resumePlayback);
      window.removeEventListener("focus", playAllVideos);
      window.removeEventListener("pointerdown", playAllVideos);
      window.removeEventListener("touchstart", playAllVideos);
    };
  }, [playAllVideos]);

  useEffect(() => {
    const keepVideosPlaying = window.setInterval(() => {
      playAllVideos();
    }, 1800);

    const advanceCarousel = window.setInterval(() => {
      goToNextVideo();
    }, 9000);

    return () => {
      window.clearInterval(keepVideosPlaying);
      window.clearInterval(advanceCarousel);
    };
  }, [goToNextVideo, playAllVideos]);

  useEffect(() => {
    window.requestAnimationFrame(playAllVideos);
  }, [activeVideo, playAllVideos]);

  useEffect(() => {
    let frame = 0;

    const syncIntroProgress = () => {
      const carousel = carouselRef.current;
      const section = carousel?.closest(".hero-section") as HTMLElement | null;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const pinDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const revealDistance = Math.min(isMobile ? 160 : 280, pinDistance);
      const scrolledInsideHero = Math.min(Math.max(-rect.top, 0), revealDistance);
      const nextProgress = Math.min(scrolledInsideHero / revealDistance, 1);

      setIntroProgress(nextProgress);
    };

    const requestSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(syncIntroProgress);
    };

    syncIntroProgress();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  const introOpacity = Math.max(1 - introProgress, 0);
  const carouselStyle = {
    "--intro-progress": introProgress,
    "--intro-opacity": introOpacity,
    "--intro-blur": `${7 * introOpacity}px`,
    "--intro-offset": `${-14 * introProgress}px`,
    "--intro-scale": 1 + introProgress * 0.01,
  } as CSSProperties;

  return (
    <div
      ref={carouselRef}
      className={
        isLoaded
          ? introProgress > 0.72
            ? "hero-video-carousel is-loaded is-intro-hidden"
            : "hero-video-carousel is-loaded"
          : "hero-video-carousel"
      }
      style={carouselStyle}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const startY = touchStartY.current;
        const endX = event.changedTouches[0]?.clientX;
        const endY = event.changedTouches[0]?.clientY;
        touchStartX.current = null;
        touchStartY.current = null;

        if (
          startX === null ||
          startY === null ||
          endX === undefined ||
          endY === undefined
        ) {
          return;
        }

        const distanceX = endX - startX;
        const distanceY = endY - startY;
        if (Math.abs(distanceX) < 48 || Math.abs(distanceX) <= Math.abs(distanceY)) {
          return;
        }

        if (distanceX < 0) goToNextVideo();
        else goToPreviousVideo();
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
        touchStartY.current = event.touches[0]?.clientY ?? null;
      }}
    >
      <div
        className="hero-video-carousel__track"
        style={{ transform: `translate3d(-${activeVideo * 100}%, 0, 0)` }}
      >
        {videos.map((video, index) => (
          <div className="hero-video-carousel__slide" key={video.src}>
            <video
              aria-hidden="true"
              className="hero-video-carousel__video"
              disablePictureInPicture
              disableRemotePlayback
              autoPlay
              loop
              muted
              onCanPlay={(event) => {
                setIsLoaded(true);
                playVideo(event.currentTarget);
              }}
              onLoadedData={(event) => {
                setIsLoaded(true);
                playVideo(event.currentTarget);
              }}
              onPause={(event) => {
                const isMobile = window.matchMedia("(max-width: 760px)").matches;
                if (!isMobile || index === activeVideo) {
                  playVideo(event.currentTarget);
                }
              }}
              onPlaying={() => {
                setIsLoaded(true);
              }}
              onStalled={(event) => {
                playVideo(event.currentTarget);
              }}
              playsInline
              preload={index === 0 ? "auto" : "metadata"}
              ref={(node) => {
                videoRefs.current[index] = node;
                const isMobile = window.matchMedia("(max-width: 760px)").matches;
                if (!isMobile || index === activeVideo) playVideo(node);
              }}
              tabIndex={-1}
              title={video.title}
            >
              <source
                media="(max-width: 760px)"
                src={video.mobileSrc}
                type="video/mp4"
              />
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      <button
        aria-label="Video anterior"
        className="hero-video-carousel__control hero-video-carousel__control--previous"
        onClick={goToPreviousVideo}
        type="button"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <button
        aria-label="Proximo video"
        className="hero-video-carousel__control hero-video-carousel__control--next"
        onClick={goToNextVideo}
        type="button"
      >
        <span aria-hidden="true">›</span>
      </button>

      <a className="hero-video-carousel__cta" href="#formulario">
        Equipar meu escritório
      </a>

      <div className="hero-video-carousel__status">
        {videos.map((video, index) => (
          <button
            aria-label={`Ir para ${video.title}`}
            className={
              index === activeVideo
                ? "hero-video-carousel__dot is-active"
                : "hero-video-carousel__dot"
            }
            key={video.src}
            onClick={() => goToVideo(index)}
            type="button"
          />
        ))}
      </div>

      <div className="hero-video-carousel__intro">
        <div className="hero-video-carousel__intro-copy">
          <h1>A cadeira mais barata é a que sai mais caro pro seu escritório.</h1>
          <p className="hero-video-carousel__intro-support">
            Ela quebra rápido, o time senta com dor e você compra tudo de novo
            daqui a um ano e meio.
          </p>
          <p className="hero-video-carousel__intro-subtitle">
            Cadeiras Cavaletti, com garantia de fábrica e a ergonomia que a lei
            exige, montadas e ajustadas pro seu escritório.
          </p>
        </div>
      </div>
    </div>
  );
}
